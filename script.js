document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img');
  const resetButton = document.getElementById('reset');
  const verifyButton = document.getElementById('verify');
  const para = document.getElementById('para');

  let state = 1;
  let selectedImages = [];

  // Function to shuffle array elements
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  // Function to reset state
  const resetState = () => {
    selectedImages = [];
    resetButton.style.display = 'none';
    verifyButton.style.display = 'none';
    para.textContent = '';

    // Reset class names for images
    images.forEach((image, index) => {
      image.className = `img${index + 1}`;
    });

    // Reset state to State 1
    state = 1;
  };

  // Function to handle image click
  const handleImageClick = (index) => {
    if (state === 1) {
      selectedImages.push(index);
      state = 2;
      resetButton.style.display = 'block';
    } else if (state === 2) {
      // Do nothing if user tries to click more tiles without resetting
    } else if (state === 3) {
      selectedImages.push(index);
      state = 4;
      verifyButton.style.display = 'block';
    }
  };

  // Function to handle reset button click
  resetButton.addEventListener('click', () => {
    resetState();
  });

  // Function to handle verify button click
  verifyButton.addEventListener('click', () => {
    if (selectedImages.length === 2) {
      const [index1, index2] = selectedImages;
      const className1 = images[index1].className;
      const className2 = images[index2].className;

      if (className1 === className2) {
        para.textContent = 'You are a human. Congratulations!';
      } else {
        para.textContent = 'We can\'t verify you as a human. You selected the non-identical tiles.';
      }

      // Hide Verify button
      verifyButton.style.display = 'none';

      // Reset state to State 1
      state = 1;
    }
  });

  // Add click event listener to each image
  images.forEach((image, index) => {
    image.addEventListener('click', () => {
      handleImageClick(index);
    });
  });

  // Initialize images and shuffle
  const imageSrcArray = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg'];
  imageSrcArray.forEach((src, index) => {
    images[index].src = src;
  });

  shuffleArray(imageSrcArray);
});


