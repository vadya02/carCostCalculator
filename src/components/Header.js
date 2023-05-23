// import logo from './logo.svg';
import React, { useState } from 'react';
import '../css/App.css';
import '../css/normalize.css';

function Header() {
    const [carBrand, setCarBrand] = useState('');
    const [carModel, setCarModel] = useState('');
    const [fuelConsumption, setFuelConsumption] = useState(0);
    const [annualMileage, setAnnualMileage] = useState(0);
    const [fuelPrice, setFuelPrice] = useState(0);
  
    const calculateOwnershipCost = () => {
      // Расчет годовой стоимости владения автомобилем
      const ownershipCost = (carBrand + carModel + fuelConsumption + annualMileage) * fuelPrice;
  
      // Дополнительная логика или вывод результата
      console.log('Годовая стоимость владения автомобилем:', ownershipCost);
    };
  
    return (
      <div className='header'>
        <p className='text-header'>Автокалькулятор.рф</p>
        
      </div>
    );
}

export default Header;
