import ListGroup from './components/ListGroup';
import Alert from './components/Alert';

function App() {


  return (
    <div>
      <Alert>Hello World</Alert>
    </div>
  );

  // let items = [
  //     'New York',
  //     'San Francisco',
  //     'Tokyo',
  //     'London',
  //     'Paris'
  // ];

  // const handleSelectItem = (item: string) => {
  //   console.log(item);
  // }

  // return <div><ListGroup items={items} heading="Cities" onSelectItem={handleSelectItem}></ListGroup></div>;
}

export default App;