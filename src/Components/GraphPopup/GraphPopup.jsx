import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const GraphPopup = ({ isOpen, onRequestClose, graphType }) => {
    const [predictiveData, setPredictiveData] = useState(null);
    const [impactCards, setImpactCards] = useState([]);

    useEffect(() => {
        if (isOpen) {
            axios.get(`http://127.0.0.1:8000/api/${graphType}-popup/`)
                .then(response => {
                    setPredictiveData(response.data.predictive_graph);
                    setImpactCards(response.data.impact_cards);
                })
                .catch(error => {
                    console.error("There was an error fetching the data!", error);
                });
        }
    }, [isOpen, graphType]);

    const renderImpactCards = () => {
        return impactCards.map((card, index) => (
            <div key={index} className="impact-card">
                <h3>{card.title}</h3>
                <p>{card.value}</p>
                <p className='description'>{card.description}</p>
            </div>
        ));
    };

    const renderPredictiveGraph = () => {
        if (!predictiveData) return null;

        const data = {
            labels: predictiveData.dates,
            datasets: [
                {
                    label: 'Predicted Values',
                    data: predictiveData.values,
                    borderColor: 'rgba(75,192,192,1)',
                    backgroundColor: 'rgba(75,192,192,0.2)',
                    fill: true,
                },
            ],
        };

        return (
          <div className="chart-container">
              <Line data={data} />
          </div>
      );

    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Graph Popup">
            <div className="popup-content">
                <h2>{graphType.charAt(0).toUpperCase() + graphType.slice(1)} Chart Predictive & Impact Analysis</h2>
                {renderPredictiveGraph()}
                <div className="impact-cards">
                    {renderImpactCards()}
                </div>
                <button onClick={onRequestClose}>Close</button>
            </div>
        </Modal>
    );
};

export default GraphPopup;
