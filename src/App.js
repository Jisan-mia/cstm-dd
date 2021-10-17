import { useState } from 'react';
import CustomDropdown from './component/Custom Dropdown/CustomDropdown';
import data from './data/countries.json'


function App() {
  const [selectedValue, setSelectedValue] = useState({ name: "Afghanistan", code: "AF" })
  const [isEditable, setIsEditable] = useState(false)


  return (
    <div className="App">
      <CustomDropdown 
        options={data}
        placeholder="Select country.."
        selectedValue={selectedValue}
        id='code'
        label='name'
        onChange={(val) => setSelectedValue(val)}
        isEditable={isEditable}
      />
    </div>
  );
}

export default App;
