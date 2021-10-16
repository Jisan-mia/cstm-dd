import { useState } from 'react';
import CustomDropdown from './component/Custom Dropdown/CustomDropdown';
import data from './data/countries.json'


function App() {
  const [selectedValue, setSelectedValue] = useState(null)
  const [isEditable, setIsEditable] = useState(true)


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
