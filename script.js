// Load the Google API client library
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

// Initialize the API client library and set up sign-in listeners
function initClient() {
  gapi.client.init({
    clientId: 'f2021XXXX',
    scope: 'email'
  }).then(function() {
    // Listen for sign-in state changes
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

    // Attach sign-in event handler to the sign-in button
    document.getElementById('google-login-btn').addEventListener('click', handleAuthClick);
  });
}

// Updating UI based on the signed-in status
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      // User is signed in, display authenticated content or redirect to the desired page
      // For example:
      // window.location.href = "authenticated.html";
      console.log('User is signed in.');
      document.getElementById('login-container').style.display = 'none';
      document.getElementById('swap-container').style.display = 'block';
      checkSwapRequest();
    } else {
      // User is not signed in, display the login button
      console.log('User is not signed in.');
      document.getElementById('login-container').style.display = 'block';
      document.getElementById('swap-container').style.display = 'none';
    }
  }
  
  document.getElementById('swap-form').addEventListener('submit', handleSwap);
  
  function handleSwap(event) {
    event.preventDefault();
    const userId = document.getElementById('user-id').value;
    const userName = document.getElementById('user-name').value;
  
    // Perform the swapping logic here or make an API request to handle the swap
    console.log('User ID:', userId);
    console.log('User Name:', userName);
  
    // Clear the input fields
    document.getElementById('user-id').value = '';
    document.getElementById('user-name').value = '';
  }
  

// Handle sign-in button click event
function handleAuthClick() {
  gapi.auth2.getAuthInstance().signIn();
}

function checkSwapRequest() {
    const userId = 'f20210227'; // Assuming the current user's ID
    const requestUserId = 'f20210229'; // Assuming the user who requested the swap has ID
  
    if (userId === requestUserId) {
      // Current user received a swap request
      const swapRequestContainer = document.createElement('div');
      swapRequestContainer.innerHTML = `
        <p>Someone has requested a mess swap with you!</p>
        <button id="accept-swap-btn">Accept</button>
        <button id="reject-swap-btn">Reject</button>
      `;
  
      document.getElementById('swap-container').appendChild(swapRequestContainer);
  
      document.getElementById('accept-swap-btn').addEventListener('click', handleAcceptSwap);
      document.getElementById('reject-swap-btn').addEventListener('click', handleRejectSwap);
    }
  }
  
  function handleAcceptSwap() {
    // Logic for accepting the swap request
    console.log('Swap request accepted.');
    
    // Store the accepted swap information locally
    const acceptedSwap = {
      userId: 'f20210227', // Current user's ID
      requesterId: 'f20210229', // Requester's ID
      accepted: true
    };
    localStorage.setItem('swapRequest', JSON.stringify(acceptedSwap));
    
    // Perform any necessary actions after accepting the swap
  }
  
  function handleRejectSwap() {
    // Logic for rejecting the swap request
    console.log('Swap request rejected.');
  
    // Store the rejected swap information locally
    const rejectedSwap = {
      userId: 'f20210227', // Current user's ID
      requesterId: 'f20210229', // Requester's ID
      accepted: false
    };
    localStorage.setItem('swapRequest', JSON.stringify(rejectedSwap));
  
    // Perform any necessary actions after rejecting the swap
  }
  
  // Check if there is a pending swap request on page load
  document.addEventListener('DOMContentLoaded', function() {
    const swapRequest = localStorage.getItem('swapRequest');
    if (swapRequest) {
      const { userId, requesterId, accepted } = JSON.parse(swapRequest);
      if (userId === '1f20210227' && requesterId === 'f20210229' && !accepted) {
        // Display a message to the user about the pending swap request
        const swapRequestContainer = document.createElement('div');
        swapRequestContainer.innerHTML = `
          <p>Someone has requested a mess swap with you!</p>
        `;
        document.getElementById('swap-container').appendChild(swapRequestContainer);
      }
    }
  });