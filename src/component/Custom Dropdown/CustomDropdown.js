import React, { useEffect, useRef, useState } from 'react'
import styles from './CustomDropdown.module.scss'

const CustomDropdown = (
  {
    options,
    placeholder, 
    selectedValue, 
    id,
    label,
    onChange,
    isEditable
  }
  ) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('')

  const ref = useRef(null);
  const inputRef = useRef(null)

  useEffect(() => {
    // fixing mobile support
    ['click', 'touchend'].forEach(event => {
      document.addEventListener(event, toggleDropdown);
    })

    return () => ['click', 'touchend'].forEach(event => {
      document.removeEventListener(event, toggleDropdown)
    })
    
  }, []);

  function toggleDropdown(e) {
    if(isEditable) {
      setIsOpen(e && e.target === inputRef.current)  
    } else {
      setIsOpen(e && e.target === ref.current)
    }
    
  }

  const filterOptions = (options) => {
    if(!isEditable) return options;
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

  const handleSelectOption = option => {
    setQuery('');
    onChange(option);
    setIsOpen(false);
  }

  return (
    <div className={styles.dropdown}>
      <div 
        className={styles.control} 
        onClick={() => {
          if(!isEditable) setIsOpen(!isOpen)
          else return
        }}
       
      
      >
        <div className={`${isEditable ? styles.selected__input__value : styles.selected__value}`} ref={ref}>
          {
            isEditable ? (
              <input 
                type="text" 
                ref={inputRef}
                placeholder={selectedValue ? selectedValue[label] : placeholder}
                value={displayInputValue()}
                onChange={e => {
                  setQuery(e.target.value);
                  onChange(null)
                }}
                onClick={toggleDropdown}
                onTouchEnd={toggleDropdown}
              />
            )
            : selectedValue ? selectedValue[label] : placeholder
          }
          {/* {selectedValue ? selectedValue[label] : placeholder} */}
          
        
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
                onClick={() => handleSelectOption(option)}
                onTouchEnd={() => handleSelectOption(option)}
              >
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
