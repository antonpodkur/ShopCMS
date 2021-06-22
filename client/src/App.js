import './App.css';
import {useState} from 'react';

function App() {

  const [image, setImage] = useState();

  async function handleChange(files)
  {
    setImage(files[0]);
    let formData = new FormData();
    formData.append('image', files[0]);
    try {
      const post = await axios.post('http://localhost:3000', formData);
      console.log(post);
    } catch(e) {
      cosole.error(e.message);
    }
    console.log(image);
  }

  return (
    <div className="App">
      <input type="file" onChange={e => handleChange(e.target.files)}/>
    </div>
  );
}

export default App;
