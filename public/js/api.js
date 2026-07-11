// // api.js - Core Security Matrix API Request Router
// const API_BASE_URL = '/api/admins'; // Replace with your actual server endpoint
const BASE_URL = 'http://localhost:3000'; 

async function handleResponse(response) {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export async function fetchBaseData() {
  try {
    const response = await fetch(`${BASE_URL}/api/landing-page`);
    return await handleResponse(response);
    // Expected return format: { instituteData: {...}, stats: {...} }
  } catch (error) {
    console.error('Failed to fetch base data:', error);
    throw error;
  }
}

export async function fetchPartners() {
  try {
    const response = await fetch('/api/partners'); // Replace with your actual endpoint URL
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching partners:', error);
    return []; // Return empty array fallback so it doesn't crash the UI
  }
}

/**
 * Fetches the entire list of courses
 */
export async function fetchCourses() {
  try {
    const response = await fetch(`${BASE_URL}/api/courses`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    throw error;
  }
}


/**
 * Fetches details for a specific course by its ID
 */
export async function fetchCourseById(id) {
  try {
    const response = await fetch(`${BASE_URL}/api/course/${id}`);
    return await handleResponse(response);
  } catch (error) {
    console.error(`Failed to fetch course with id ${id}:`, error);
    throw error;
  }
}


export async function fetchApplyInfo() {
  try {
    const response = await fetch(`${BASE_URL}/api/apply/info`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    throw error;
  }
}

export async function fetchDashboardDataStudent(id) {
  try {

    const response = await fetch(`${BASE_URL}/api/student/dashboard/${id}`)
    return await handleResponse(response);

  } catch (error) {
    console.error('Failed to fetch courses:', error);
    throw error;
  }
}

export async function fetchStudentNotice(id) {
  try {

    const response = await fetch(`${BASE_URL}/api/student/notices/${id}`);
    return await handleResponse(response);

  } catch (error) {
    console.error('Failed to fetch courses:', error);
    throw error;
  }
}

export async function login(userId, password) {
    const response = await fetch(`${BASE_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, password })
    });

    return await handleResponse(response);
}


export const AdminAPI = {
  // GET: Fetch all administrative operators
  async getAll() {
    try {
      const response = await fetch(`${BASE_URL}/api/admins`);
      if (!response.ok) throw new Error('Failed to retrieve system registries.');
      return await response.json();
    } catch (error) {
      console.error('API Error (getAll):', error);
      throw error;
    }
  },

  // POST: Provision a brand new admin account
  async create(adminData) {
    try {
      const response = await fetch(`${BASE_URL}/api/admin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adminData)
      });
      if (!response.ok) throw new Error('Authorization failed. Data integrity mismatch.');
      return await response.json();
    } catch (error) {
      console.error('API Error (create):', error);
      throw error;
    }
  },

  // PUT: Modify an existing personnel identity record
  async update(id, adminData) {
    try {
      const response = await fetch(`${BASE_URL}/api/admin/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adminData)
      });
      if (!response.ok) throw new Error('Modification request denied by server.');
      return await response.json();
    } catch (error) {
      console.error('API Error (update):', error);
      throw error;
    }
  },

  // DELETE: Completely wipe clearance credentials
  async delete(id) {
    try {
      const response = await fetch(`${BASE_URL}/api/admin/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Revocation request dropped.');
      return true;
    } catch (error) {
      console.error('API Error (delete):', error);
      throw error;
    }
  },

// GET: Fetch current application configurations
  async getApplicationInfo() {
    try {
      const response = await fetch(`${BASE_URL}/api/application-info`);
      if (!response.ok) throw new Error('Failed to retrieve application information.');
      return await response.json();
    } catch (error) {
      console.error('API Error (getApplicationInfo):', error);
      throw error;
    }
  },

  // PUT: Modify application configs (deadline, fee, bank details, etc.)
  async updateApplicationInfo(infoData) {
    try {
      const response = await fetch(`${BASE_URL}/api/application-info`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(infoData)
      });
      if (!response.ok) throw new Error('Failed to update application details.');
      return await response.json();
    } catch (error) {
      console.error('API Error (updateApplicationInfo):', error);
      throw error;
    }
  },


async getAllPartners() {
    try {
      const response = await fetch(`${BASE_URL}/api/partners`);
      if (!response.ok) throw new Error('Failed to retrieve corporate partners.');
      return await response.json();
    } catch (error) {
      console.error('API Error (getAllPartners):', error);
      throw error;
    }
  },

  // POST: Onboard a brand new partner entity
  async createPartner(partnerData) {
    try {
      const response = await fetch(`${BASE_URL}/api/admin/partners`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(partnerData)
      });
      if (!response.ok) throw new Error('Failed to register partner profile.');
      return await response.json();
    } catch (error) {
      console.error('API Error (createPartner):', error);
      throw error;
    }
  },

  // PUT: Update partner parameters (name or logoUrl)
  async updatePartner(id, partnerData) {
    try {
      const response = await fetch(`${BASE_URL}/api/admin/partners/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(partnerData)
      });
      if (!response.ok) throw new Error('Partner adjustment request denied.');
      return await response.json();
    } catch (error) {
      console.error('API Error (updatePartner):', error);
      throw error;
    }
  },

  // DELETE: Expel a partner item out of the registry array
  async deletePartner(id) {
    try {
      const response = await fetch(`${BASE_URL}/api/admin/partners/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to terminate partner mapping.');
      return true;
    } catch (error) {
      console.error('API Error (deletePartner):', error);
      throw error;
    }
  }

};

const COURSE_API_BASE_URL = `${BASE_URL}/api/courses`; 

export const CourseAPI = {
  // GET: Fetch all academic courses
  async getAll() {
    try {
      const response = await fetch(COURSE_API_BASE_URL);
      if (!response.ok) throw new Error('Failed to retrieve academic program records.');
      return await response.json();
    } catch (error) {
      console.error('API Error (getAll):', error);
      throw error;
    }
  },

    // POST: Deploy a brand new course record
    async create(courseData) {
      try {
        const response = await fetch(COURSE_API_BASE_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(courseData)
        });
        if (!response.ok) throw new Error('Failed to deploy new course meta framework.');
        return await response.json();
      } catch (error) {
        console.error('API Error (create):', error);
        throw error;
      }
    },

    // PUT: Modify an existing course profile
    async update(id, courseData) {
      try {
        const response = await fetch(`${COURSE_API_BASE_URL}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(courseData)
        });
        if (!response.ok) throw new Error('Modification request rejected by curriculum matrix.');
        return await response.json();
      } catch (error) {
        console.error('API Error (update):', error);
        throw error;
      }
    },

    // DELETE: Purge catalog entry entirely
    async delete(id) {
      try {
        const response = await fetch(`${COURSE_API_BASE_URL}/${id}`, {
          method: 'DELETE'
        });
        if (!response.ok) throw new Error('Revocation sequence halted by server safety checks.');
        return true;
      } catch (error) {
        console.error('API Error (delete):', error);
        throw error;
      }
    }
  };

// studentApi.js - Core Network Data Exchange Interface Middleware
const STUDENT_API_BASE_URL = `${BASE_URL}/api/students`; // Points to your server router microservice

export const StudentAPI = {
  // GET: Fetch the current active directory
  async getAll() {
    try {
      const response = await fetch(STUDENT_API_BASE_URL);
      if (!response.ok) throw new Error('Could not pull secure directory matrix streams.');
      return await response.json();
    } catch (error) {
      console.error('API Fail Engine (getAll):', error);
      throw error;
    }
  },

  // POST: Provision a completely raw record entry identity
  async create(studentData) {
    try {
      const response = await fetch(STUDENT_API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData)
      });
      if (!response.ok) throw new Error('Authorization layer rejected identity generation.');
      return await response.json();
    } catch (error) {
      console.error('API Fail Engine (create):', error);
      throw error;
    }
  },

  // PUT: Mutate an existing student structural context
  async update(id, studentData) {
    try {
      const response = await fetch(`${STUDENT_API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData)
      });
      if (!response.ok) throw new Error('Identity modification profile write blocked.');
      return await response.json();
    } catch (error) {
      console.error('API Fail Engine (update):', error);
      throw error;
    }
  },

  // DELETE: Expunge metadata from cloud storage arrays
  async delete(id) {
    try {
      const response = await fetch(`${STUDENT_API_BASE_URL}/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Target record purge execution failed.');
      return true;
    } catch (error) {
      console.error('API Fail Engine (delete):', error);
      throw error;
    }
  }
};

// // Export to system runtime frame context mapping architectures
// window.StudentAPI = StudentAPI;

// // api.js - Centralized data fetching layer

// const STATS_API_ENDPOINT = '/api/dashboard/stats';
// const INSTITUTE_API_ENDPOINT = '/api/dashboard/institute';
// const APPLICATIONS_API_ENDPOINT = '/api/dashboard/applications';

// /**
//  * Fetches all necessary dashboard overview telemetry data concurrently.
//  * @returns {Promise<{statsData: Object, instituteData: Object, applicationsData: Array}>}
//  */
// export async function fetchDashboardData() {
//   const [statsResponse, instResponse, appsResponse] = await Promise.all([
//     fetch(STATS_API_ENDPOINT),
//     fetch(INSTITUTE_API_ENDPOINT),
//     fetch(APPLICATIONS_API_ENDPOINT)
//   ]);

//   if (!statsResponse.ok || !instResponse.ok || !appsResponse.ok) {
//     throw new Error('Database or Application services returned an unexpected network response status.');
//   }

//   return {
//     statsData: await statsResponse.json(),
//     instituteData: await instResponse.json(),
//     applicationsData: await appsResponse.json()
//   };
// }

// // js/api.js

// // Replace this base URL with your actual server URL when ready

// /**
//  * Fetches all student dashboard data from the server.
//  * Includes student profile details, registration status, payments, upcoming classes, and notices.
//  */


// // api.js

// // TODO: Replace this placeholder with your actual server URL


// /**
//  * Fetches student profile data from the server.
//  * Assumes an endpoint like: GET /api/students/current or similar.
//  */
// async function fetchStudentProfile() {
//   try {
//     const response = await fetch(`${BASE_URL}/api/student/profile`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         // If your server requires authorization, uncomment the line below:
//         // 'Authorization': `Bearer ${localStorage.getItem('token')}`
//       }
//     });

//     if (!response.ok) {
//       throw new Error(`Server error: ${response.status} ${response.statusText}`);
//     }

//     const studentData = await response.json();
//     updateProfileDOM(studentData);

//   } catch (error) {
//     console.error('Failed to load student profile:', error);
//     showErrorMessage();
//   }
// }

// /**
//  * Dynamically maps the fetched JSON data into the HTML elements.
//  * @param {Object} data - The student profile object from the server.
//  */


// /**
//  * Optional fallback layout if the server request fails.
//  */
// function showErrorMessage() {
//   const container = document.querySelector('.page-header .container');
//   if (container) {
//     const errorDiv = document.createElement('div');
//     errorDiv.style.color = '#ef4444';
//     errorDiv.style.marginTop = '1rem';
//     errorDiv.style.fontWeight = '500';
//     errorDiv.textContent = '⚠️ Unable to connect to the server. Displaying cached/mock data details.';
//     container.appendChild(errorDiv);
//   }
// }

// // Fire the network call as soon as the DOM content is ready
// document.addEventListener('DOMContentLoaded', fetchStudentProfile);

// // js/contact-api.js

// // TODO: Replace this placeholder with your actual server API base URL


// /**
//  * Fetches company contact details from the server and updates the UI.
//  */
// async function loadContactDetails() {
//   try {
//     const response = await fetch(`${BASE_URL}/api/contact-info`, {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json' }
//     });

//     if (!response.ok) throw new Error('Failed to fetch contact details');
//     const data = await response.json();

//     // Map fetched values using the custom data-bind attributes
//     document.querySelector('[data-bind="location"]').textContent = data.location || 'Location unavailable';
//     document.querySelector('[data-bind="email"]').textContent = data.email || 'Email unavailable';
//     document.querySelector('[data-bind="phone"]').textContent = data.phone || 'Phone unavailable';

//   } catch (error) {
//     console.error('Error fetching contact information:', error);
//     // Graceful fallback with placeholder details if server is down
//     document.querySelector('[data-bind="location"]').textContent = 'Main Campus, Tech District';
//     document.querySelector('[data-bind="email"]').textContent = 'contact@panaxheperion.edu';
//     document.querySelector('[data-bind="phone"]').textContent = '+1 (555) 019-2834';
//   }
// }

// /**
//  * Handles submission of the contact message form.
//  * @param {Event} event - The native form submit event.
//  */
// async function handleFormSubmit(event) {
//   event.preventDefault();

//   const form = event.target;
//   const submitButton = form.querySelector('button[type="submit"]');
  
//   // Extract values from form fields using their name attributes
//   const formData = {
//     fullName: form.elements['fullName'].value,
//     email: form.elements['email'].value,
//     message: form.elements['message'].value
//   };

//   try {
//     // Visual loading state feedback
//     submitButton.disabled = true;
//     submitButton.textContent = 'Sending...';

//     const response = await fetch(`${BASE_URL}/api/messages`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formData)
//     });

//     if (!response.ok) throw new Error('Server rejected submission');

//     alert('Message sent successfully! We will get back to you soon.');
//     form.reset();

//   } catch (error) {
//     console.error('Form submission error:', error);
//     alert('Failed to send your message. Please try again later or email us directly.');
//   } finally {
//     // Restore button state
//     submitButton.disabled = false;
//     submitButton.textContent = 'Send Message';
//   }
// }

// // Initial setup on script injection
// document.addEventListener('DOMContentLoaded', () => {
//   loadContactDetails();
  
//   const contactForm = document.getElementById('contact-form');
//   if (contactForm) {
//     contactForm.addEventListener('submit', handleFormSubmit);
//   }
// });

// // api.js
// // Replace with your actual server backend URL

// /**
//  * Helper function to handle fetch responses safely
//  */


// /**
//  * Fetches all base data needed for the application (institute info and stats)
//  */




// // api.js (Add this function to your file)

// /**
//  * Fetches the list of industry partners.
//  * @returns {Promise<Array<{id: string, name: string, logoUrl: string}>>}
//  */
