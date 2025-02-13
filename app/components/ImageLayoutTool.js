'use client';
import React, { useState } from 'react';
import { Download } from 'lucide-react';

const ImageLayoutTool = () => {
  const [articleUrl, setArticleUrl] = useState('');
  const [fetchedImages, setFetchedImages] = useState([
    { id: 1, src: '/api/placeholder/200/200', alt: 'Product 1' },
    { id: 2, src: '/api/placeholder/200/200', alt: 'Product 2' },
    { id: 3, src: '/api/placeholder/200/200', alt: 'Product 3' },
    { id: 4, src: '/api/placeholder/200/200', alt: 'Product 4' },
    { id: 5, src: '/api/placeholder/200/200', alt: 'Product 5' },
    { id: 6, src: '/api/placeholder/200/200', alt: 'Product 6' }
  ]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [resize, setResize] = useState(40);
  const [removeBackground, setRemoveBackground] = useState(false);
  const [selectedBackground, setSelectedBackground] = useState('blue_720');
  
  const backgroundOptions = [
    { value: 'blue_720', label: 'Blue' },
    { value: 'blue-teal', label: 'Blue Teal' },
    { value: 'deep_blue_720', label: 'Deep Blue' },
    { value: 'deep_orange_720', label: 'Deep Orange' },
    { value: 'gray_720', label: 'Gray' },
    { value: 'orange_720', label: 'Orange' },
    { value: 'teal_720', label: 'Teal' }
  ];

  const toggleImageSelection = (image) => {
    setSelectedImages(prev => 
      prev.includes(image) 
        ? prev.filter(img => img !== image)
        : [...prev, image]
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
        <input
          type="url"
          value={articleUrl}
          onChange={(e) => setArticleUrl(e.target.value)}
          placeholder="Paste article URL"
          className="w-full p-2 border rounded-lg"
        />
      </form>

      <div className="grid grid-cols-3 gap-6 py-8">
        {fetchedImages.map((image) => (
          <div
            key={image.id}
            onClick={() => toggleImageSelection(image)}
            className="cursor-pointer transition-transform duration-200"
          >
            <div className={`aspect-square rounded-full bg-gray-200 flex items-center justify-center
              ${selectedImages.includes(image) 
                ? 'ring-4 ring-blue-500 ring-offset-4 ring-offset-white' 
                : ''}`}
            >
              <span className={`text-gray-500 font-medium ${
                selectedImages.includes(image) ? 'text-blue-500' : ''
              }`}>
                Option {image.id}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
        <div className="space-y-2">
          <label className="block font-medium">Resize: {resize}px</label>
          <input
            type="range"
            min="0"
            max="100"
            value={resize}
            onChange={(e) => setResize(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="block font-medium">Background</label>
          <select
            value={selectedBackground}
            onChange={(e) => setSelectedBackground(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            {backgroundOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="removeBackground"
            checked={removeBackground}
            onChange={(e) => setRemoveBackground(e.target.checked)}
            className="rounded"
          />
          <label htmlFor="removeBackground">Remove Background</label>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-900 to-blue-800">
        <div 
          className="flex justify-center items-center h-full"
          style={{
            padding: selectedImages.length > 0 ? `48px ${resize}px` : '0'
          }}
        >
          {selectedImages.length > 0 ? (
            <div className="flex justify-center items-center space-x-4 w-full">
              {selectedImages.map((image) => (
                <div
                  key={image.id}
                  className="flex-1"
                >
                  <div className="aspect-square bg-white rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">Selected Image {image.id}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <img 
              src="/api/placeholder/1000/400" 
              alt="Layout Preview"
              className="w-full h-auto object-contain"
            />
          )}
        </div>
      </div>

      <button
        onClick={() => console.log('Exporting:', selectedImages)}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 flex items-center justify-center space-x-2"
      >
        <Download className="w-5 h-5" />
        <span>Export Layout</span>
      </button>
    </div>
  );
};

export default ImageLayoutTool;
