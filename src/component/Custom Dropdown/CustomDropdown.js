import React, { useEffect, useRef, useState } from 'react'
import styles from './CustomDropdown.module.scss'

const CustomDropdown = (
  {
    options,
    placeholder, 
    selectedValue, 
    id,
    label,
    onChange
  }
  ) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('')

  const ref = useRef(null);

  useEffect(() => {
    document.addEventListener('click', closeDropdown);
    return () => document.removeEventListener('click', closeDropdown)
  }, []);

  function closeDropdown(e) {
    setIsOpen(e && e.target == ref.current)
  }

  const filterOptions = (options) => {
    return options.filter(
      option => 
        option[label].toLowerCase().indexOf(query.toLowerCase()) > -1
    )
  }

  const displayInputValue = () => {
    if(query.length > 0) return query;
    if(selectedValue) return selectedValue[label];
    
    return ''
  }

  return (
    <div className={styles.dropdown}>
      <div className={styles.control} onClick={() => setIsOpen(!isOpen)}>
        <div className={styles.selected__value} >
        
          {/* {selectedValue ? selectedValue[label] : placeholder} */}
          <input 
            type="text" 
            ref={ref}
            placeholder={selectedValue ? selectedValue[label] : placeholder}
            value={displayInputValue()}
            onChange={e => {
              setQuery(e.target.value);
              onChange(null)
            }}
            onClick={() => setIsOpen(!isOpen)}
          />
        
        </div>
        <div className={`${styles.arrow} ${isOpen ? styles.open : null}`}></div>
      </div>

      <div className={`${styles.options__container} ${isOpen ? styles.open : null}`}>
        {
          filterOptions(options).map(option => 
            (
              <div 
                key={option[id]} 
                className={`${styles.options__item} ${selectedValue === option ? styles.selected : null}`} 
                onClick={() => {
                  setQuery('');
                  onChange(option);
                  setIsOpen(false);
                }}>
                {option[label]}
              </div>
            )
          )
        }
        
      </div>
    </div>
  )
}

export default CustomDropdown
