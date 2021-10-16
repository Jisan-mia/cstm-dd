import React, { useState } from 'react'
import styles from './CustomDropdown.module.scss'

const CustomDropdown = ({options, placeholder, selectedValue, onChange}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={styles.dropdown}>
      <div className={styles.control} onClick={() => setIsOpen(!isOpen)}>
        <div className={styles.selected__value}>{selectedValue?.name || placeholder}</div>
        <div className={`${styles.arrow} ${isOpen ? styles.open : null}`}></div>
      </div>

      <div className={`${styles.options__container} ${isOpen ? styles.open : null}`}>
        {
          options.map(option => 
            (
              <div 
                key={option.name} 
                className={`${styles.options__item} ${selectedValue === option ? styles.selected : null}`} 
                onClick={() => {
                  onChange(option);
                  setIsOpen(false)
                }}>
                {option.name}
              </div>
            )
          )
        }
        
      </div>
    </div>
  )
}

export default CustomDropdown
