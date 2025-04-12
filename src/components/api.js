const API_BASE_URL = 'http://localhost:3001/api'; 


export const registerUser = async (userData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await res.json();
      } else {
        const text = await res.text();
        console.error('Unexpected response:', text);
        return { success: false, message: 'Unexpected response format from server' };
      }
    } catch (err) {
      console.error('Register Error:', err);
      return { success: false, message: 'Network error or server is down' };
    }
  };

// Login
export const loginUser = async (credentials) => {
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Ensure Content-Type is application/json
        },
        body: JSON.stringify(credentials), // Ensure body is stringified as valid JSON
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
  
      const data = await response.json(); // Parse the response JSON
      return data;
    } catch (err) {
      console.error('Login Error:', err);
      throw err; // Rethrow the error for further handling
    }
  };

// Update personal details (protected route)
export const updateUserDetails = async (details, token) => {
  try {
    const res = await fetch(`${API_BASE_URL}/details`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(details),
    });
    return await res.json();
  } catch (err) {
    console.error('Update Error:', err);
    return { success: false, message: 'Network error' };
  }
};