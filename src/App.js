import { useState } from 'react';
import CustomDropdown from './component/Custom Dropdown/CustomDropdown';
import data from './data/animals.json'


function App() {
  const [selectedValue, setSelectedValue] = useState(null)


  return (
    <div className="App">
      <CustomDropdown 
        options={data}
        placeholder="Select animal.."
        selectedValue={selectedValue}
        id='id'
        label='name'
        onChange={(val) => setSelectedValue(val)}
      />
    </div>
  );
}

export default App;
