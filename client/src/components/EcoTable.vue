<template>
  <div class="eco-table">
    <h2>Eco Data</h2>

    <label for="country">Select country: </label>
    <select id="country" v-model="localCountry">
      <option value="Ukraine">Ukraine</option>
      <option value="Poland">Poland</option>
    </select>

    <button @click="refreshData">🔄</button>

    <table border="1" cellspacing="0" cellpadding="5" v-if="ecoData.length">
      <thead>
        <tr>
          <th>Location</th>
          <th>AQI</th>
          <th>PM10</th>
          <th>PM2.5</th>
          <th>Updated</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in ecoData" :key="item._id">
          <td>{{ item.locationName }}</td>
          <td contenteditable="true"
              @blur="updateField(item._id, 'airQualityIndex', $event.target.innerText)">
            {{ item.airQualityIndex }}
          </td>
          <td contenteditable="true"
              @blur="updateField(item._id, 'pm10', $event.target.innerText)">
            {{ item.pm10 }}
          </td>
          <td contenteditable="true"
              @blur="updateField(item._id, 'pm25', $event.target.innerText)">
            {{ item.pm25 }}
          </td>
          <td>{{ new Date(item.updatedAt).toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>

    <p v-else>No data available</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from "vue";
import axios from "axios";

interface EcoData {
  _id: string;
  country: string;
  locationName: string;
  airQualityIndex: number;
  pm10: number;
  pm25: number;
  updatedAt: string;
}

export default defineComponent({
  name: "EcoTable",
  props: {
    selectedCountry: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const ecoData = ref<EcoData[]>([]);
    const loading = ref(false);
    const localCountry = ref(props.selectedCountry); 
    watch(localCountry, (newCountry) => {
      fetchData(newCountry);
    });

    const fetchData = async (country: string) => {
      try {
        loading.value = true;
        const res = await axios.get<EcoData[]>(`http://localhost:3000/api/eco?country=${country}`);
        ecoData.value = Array.isArray(res.data) ? res.data : [];
      } catch (err) {
        console.error(err);
      } finally {
        loading.value = false;
      }
    };

    const refreshData = async () => {
      try {
        loading.value = true;
        await axios.post("http://localhost:3000/api/eco/fetch");
        await fetchData(localCountry.value);
      } catch (err) {
        console.error("Error refreshing data:", err);
      } finally {
        loading.value = false;
      }
    };

    const updateField = async (id: string, field: keyof EcoData, value: string) => {
      const numericFields: (keyof EcoData)[] = ["airQualityIndex", "pm10", "pm25"];
      const parsedValue = numericFields.includes(field) ? parseFloat(value) : value;

      ecoData.value = (ecoData.value || []).map((item) =>
        item._id === id ? { ...item, [field]: parsedValue } : item
      );

      const updatedItem = ecoData.value.find((item) => item._id === id);
      if (!updatedItem) return;

      try {
        await axios.put(`http://localhost:3000/api/eco/${id}`, updatedItem);
      } catch (err) {
        console.error("Error updating data:", err);
      }
    };

    onMounted(() => {
      fetchData(localCountry.value);
    });

    return { ecoData, loading, fetchData, refreshData, updateField, localCountry };
  }
});
</script>

<style scoped>
.eco-table {
  padding: 1rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  text-align: center;
}
</style>
