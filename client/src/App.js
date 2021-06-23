import './App.css';
import {useState} from 'react';
import axios from 'axios';


function App() {

  const [image, setImage] = useState();

  async function handleChange(files)
  {
    setImage(files[0]);
    let formData = new FormData();

    formData.append('img', files[0]);
    formData.append('name', 'test2');
    formData.append('price', 400);
    formData.append('description', 'none');
    
    try {
      
      var config = {
        method: 'post',
        url: 'http://localhost:3000/products',
        headers: { "Content-Type": "multipart/form-data" },
        data : formData,
      };

      const post = await axios(config);
      console.log(post);
    } catch(e) {
      console.error(e.message);
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
