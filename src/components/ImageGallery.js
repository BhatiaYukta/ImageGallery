import React, { useEffect, useState } from 'react';
import './ImageGallery.css';
const ImageGallery = () => {
    const [images, setImages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const imagesPerPage = 6; // Number of images to display per page
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    useEffect(() => {
        const folderId = '1_qOJ0z3kI_e2IJq4X6HqF0T1ROBESygS'; // Replace this with the ID of your Google Drive folder
        const apiKey = 'Google API key'; // Replace this with your actual Google API key

        // Fetch images from the public Google Drive folder
        fetch(`https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&fields=files(id)&key=${apiKey}`)
            .then((response) => response.json())
            .then((data) => {
                const imageUrls = data.files.map((file) => `https://drive.google.com/uc?id=${file.id}`);
                setImages(imageUrls);
            })
            .catch((error) => {
                console.error('Error fetching images from Google Drive:', error);
            });
    }, []);
  // Function to handle pagination when the user clicks on page numbers
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to handle image click (interaction)
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowModal(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Calculate the index of the last image on the current page
  const indexOfLastImage = currentPage * imagesPerPage;
  // Calculate the index of the first image on the current page
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  // Get the current images to display on the current page
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

  return (
    <div className="image-gallery">
      <h2>Image Gallery</h2>
      <div className="image-grid">
        {currentImages.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`Image ${index + 1}`}
            onClick={() => handleImageClick(imageUrl)} // Add onClick event handler for image interaction
          />
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: Math.ceil(images.length / imagesPerPage) }, (_, i) => i + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={currentPage === pageNumber ? 'active' : ''}
          >
            {pageNumber}
          </button>
        ))}
      </div>

      {/* Modal to display larger image */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content">
            <img src={selectedImage} alt="Large Image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;