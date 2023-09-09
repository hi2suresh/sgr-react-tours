import { useEffect, useState } from 'react';
import Loading from './Loading';
import Tours from './Tours';

const url = 'https://course-api.com/react-tours-project';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [toursData, setToursData] = useState([]);
  const removeTour = (id) => {
    const newTours = toursData.filter((tour) => tour.id !== id);
    console.log(`id: ${id}`);
    setToursData(newTours);
  };

  const fetchTours = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        setIsLoading(false);
        setIsError(true);
        return;
      }
      const tours = await response.json();
      setToursData(tours);
      console.log(toursData);
    } catch (err) {
      console.log(err);
      setIsError(true);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchTours();
  }, []);
  if (isLoading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  if (toursData.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <button
            type="button"
            className="btn"
            style={{ marginTop: '2rem' }}
            onClick={fetchTours}
          >
            Refresh
          </button>
        </div>
      </main>
    );
  }
  return (
    <main>
      <Tours tours={toursData} removeTour={removeTour} />
    </main>
  );
};
export default App;
