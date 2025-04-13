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

    // Handle JSON response
    if (contentType && contentType.includes('application/json')) {
      const data = await res.json();

      if (!res.ok) {
        // 💥 Throw error with status and message for non-2xx responses
        throw { status: res.status, message: data.message || 'Registration failed' };
      }

      // Success case
      localStorage.setItem("authToken", data.token);
      return { success: true, ...data };
    } else {
      const text = await res.text();
      throw { status: res.status, message: text || 'Unexpected response format from server' };
    }
  } catch (err) {
    console.error('Register Error:', err);
    throw err; // 🔁 Bubble up the error to handle in handleClick
  }
};

// Login
export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const contentType = response.headers.get('content-type');
    const data = contentType && contentType.includes('application/json')
      ? await response.json()
      : { message: await response.text() };

    if (!response.ok) {
      // 💥 Properly throw with both status and message
      throw { status: response.status, message: data.message || 'Login failed' };
    }

    localStorage.setItem("authToken", data.token);
    return { success: true, ...data };
  } catch (err) {
    console.error('Login Error:', err);
    throw err;
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
export const postUserDetails = async (details) => {
  try {
    const token = localStorage.getItem("authToken"); // or wherever you're storing the token

    const res = await fetch(`${API_BASE_URL}/details`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,  // Send the token here
      },
      body: JSON.stringify(details),
    });

    return await res.json();
  } catch (err) {
    console.error('Post Error:', err);
    return { success: false, message: 'Network error' };
  }
}
export const getUserDetails = async () => {
  try {
    const token = localStorage.getItem("authToken"); 

    const res = await fetch(`${API_BASE_URL}/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();  // Await the JSON parsing
    return data;
    
  } catch (err) {
    console.error('Get Error:', err);
    return { success: false, message: 'Network error' };
  }
};
export const sendScore = async (score) => {
  const token = localStorage.getItem("authToken");

  try {
    const res = await fetch(`${API_BASE_URL}/update-score`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ score }),
    });

    const contentType = res.headers.get('content-type');
    const data = contentType && contentType.includes('application/json')
      ? await res.json()
      : { message: await res.text() };

    if (!res.ok) {
      // ❌ If server responded with error status, throw it
      throw { status: res.status, message: data.message || "Failed to update score" };
    }

    console.log("Score Update Response:", data);
    return { success: true, ...data };
  } catch (error) {
    console.error("Error sending score:", error);
    return {
      success: false,
      message: error.message || "Error updating score",
      status: error.status || 500,
    };
  }
};