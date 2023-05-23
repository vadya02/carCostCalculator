// import logo from './logo.svg';
import React, { useEffect ,useState } from 'react';
import '../css/App.css';
import '../css/normalize.css';
import axios from 'axios';

function StartPage() {
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

    const [isVisible, setIsVisible] = useState(false);

    const handleButtonClick = () => {
      setIsVisible(true);
    };


    //api--------------------------
    const [carData, setCarData] = useState(null);
    const [taxCost, setTaxCost] = useState(null);
    
  
    useEffect(() => {
      // Получение данных о марке и модели автомобиля
      axios.get('https://api.example.com/car')
        .then(response => setCarData(response.data))
        .catch(error => console.error(error));
  
      // Получение данных о стоимости налога
      axios.get('https://api.example.com/tax')
        .then(response => setTaxCost(response.data))
        .catch(error => console.error(error));
    }, []);
    //---------------------------
    var cost;
    var costFuel;
    var osago = taxCost;
    cost = fuelConsumption * annualMileage * fuelPrice + taxCost;
    costFuel = fuelConsumption * annualMileage * fuelPrice;
    return (
      <div className='div-all'>
        
        <div className='calculator'>
          <label className='label'>
            Марка автомобиля:
            <select value={carBrand} onChange={(e) => setCarBrand(e.target.value)}>
              <option value="">Выберите марку</option>
              <option value="Audi">Audi</option>
              <option value="BMW">BMW</option>
              <option value="Mercedes-Benz">Mercedes-Benz</option>
              {/* Другие варианты марок автомобилей */}
            </select>
          </label>
    
          <label className='label'>
            Модель автомобиля:
            <select value={carModel} onChange={(e) => setCarModel(e.target.value)}>
              <option value="">Выберите модель</option>
              {carBrand === 'Audi' && (
                <>
                  <option value="A3">A3</option>
                  <option value="A4">A4</option>
                  <option value="A6">A6</option>
                  {/* Другие варианты моделей Audi */}
                </>
              )}
              {carBrand === 'BMW' && (
                <>
                  <option value="3 Series">3 Series</option>
                  <option value="5 Series">5 Series</option>
                  <option value="X5">X5</option>
                  {/* Другие варианты моделей BMW */}
                </>
              )}
              {carBrand === 'Mercedes-Benz' && (
                <>
                  <option value="C-Class">C-Class</option>
                  <option value="E-Class">E-Class</option>
                  <option value="S-Class">S-Class</option>
                  {/* Другие варианты моделей Mercedes-Benz */}
                </>
              )}
              {/* Другие варианты моделей автомобилей */}
            </select>
          </label>
    
          <label className='label'>
            Расход топлива (л/100км):
            <input
              type="number"
              value={fuelConsumption}
              onChange={(e) => setFuelConsumption(parseFloat(e.target.value))}
            />
          </label>
    
          <label className='label'>
            Годовой пробег (км):
            <input
              type="number"
              value={annualMileage}
              onChange={(e) => setAnnualMileage(parseInt(e.target.value))}
            />
          </label>
    
          <label className='label'>
            Цена топлива:
            <input
              type="number"
              value={fuelPrice}
              onChange={(e) => setFuelPrice(parseFloat(e.target.value))}
            />
          </label>
    
          <button className='button-cost' onClick={handleButtonClick}>Рассчитать</button>
          {isVisible && <div>
            
            <table className='table'>
              <tr>
                <td>Топливо</td>
                <td>{costFuel} руб.</td>
              </tr>
              <tr>
                <td>ОСАГО</td>
                <td>{osago} руб.</td>
              </tr>
              <tr>
                <td>Налог</td>
                <td>{taxCost} руб.</td>
              </tr>
              <tr>
                <td>Итоговая стоимость</td>
                <td>{cost} руб.</td>
              </tr>
          </table>
          </div>}
        </div>
        
      </div>
    );
}

export default StartPage;
