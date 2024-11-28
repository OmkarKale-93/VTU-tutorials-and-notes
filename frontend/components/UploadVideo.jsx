import axios from 'axios';
import React, { useState } from 'react';
import './UploadVideo.css'

function UploadVideo() {
  const [formData, setFormData] = useState({  
    title: '',  
    description: '',  
    category: '',  
    thumbnail: null,  
    videoFile: null,  
  });

  const [errors, setErrors] = useState({});  

  const handleChange = (e) => {  
    const { name, value, files } = e.target;  
    if (name === 'thumbnail' || name === 'videoFile') {  
      setFormData({ ...formData, [name]: files[0] });  
    } else {  
      setFormData({ ...formData, [name]: value });  
    }  
  };

  const handleSubmit = async (e) => {  
    e.preventDefault();  
    setErrors({}); // Clear previous errors  

    // Basic validation (you might want more robust validation)  
    const validationErrors = {};  
    if (!formData.title) validationErrors.title = 'Title is required';  
    if (!formData.description) validationErrors.description = 'Description is required';  
    if (!formData.category) validationErrors.category = 'Category is required';
    setErrors(validationErrors);  

    if (Object.keys(validationErrors).length > 0) {  
      return; // Don't submit if validation fails  
    }  

    try {  
      const formDataToSend = new FormData();  
      formDataToSend.append('title', formData.title);  
      formDataToSend.append('description', formData.description);  
      formDataToSend.append('category', formData.category);  
      formDataToSend.append('thumbnail', formData.thumbnail);  
      formDataToSend.append('videoFile', formData.videoFile);  

      const response = await axios.post('/api/video/upload', formDataToSend);  
      console.log('Form data submitted successfully:', response.data);  
      // Handle success (e.g., redirect or show success message)  
    } catch (error) {  
      console.error('Error submitting form data:', error);  
      // Display a user-friendly error message  
      setErrors({ ...errors, serverError: 'Something went wrong' });  
    }  
  };

  return (
    <div className='container-up'>
      <form onSubmit={handleSubmit} method='post'>  
        <h1 className='head1'>Upload Video</h1>

        {errors.title && <div className="error">{errors.title}</div>}
        <label htmlFor="title" className='up'>  
          Title of Video:  
          <input  
            type="text"  
            name="title"  
            value={formData.title}  
            onChange={handleChange}  
          />  
        </label>

        {errors.description && <div className="error">{errors.description}</div>}
        <label htmlFor="description"className='up' >  
          Description of Video:  
          <input  
            type="text"  
            name="description"  
            value={formData.description}  
            onChange={handleChange}  
          />  
        </label>

        {errors.category && <div className="error">{errors.category}</div>}
        <label htmlFor="category" className='up'>  
          Choose category:
          <select 
            name="category"  
            value={formData.category}  
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="engineering">Engineering</option>
            <option value="MBA">MBA</option>
            <option value="MCA">MCA</option>
          </select>
        </label>

        <label htmlFor="videoFile" className='up'>
          Upload Video:
          <input type="file" name="videoFile" onChange={handleChange} /> 
        </label>

        <label htmlFor="thumbnail" className='up'>
          Thumbnail of the video:
          <input type="file" name="thumbnail" onChange={handleChange} />
        </label>

        {errors.serverError && <div className="error">{errors.serverError}</div>}
        <button type="submit" className='sub-vid'>Upload Video</button>
      </form>  
    </div>
  );
}

export default UploadVideo;
