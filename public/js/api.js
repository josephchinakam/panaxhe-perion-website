// // api.js - Core Security Matrix API Request Router
// const API_BASE_URL = '/api/admins'; // Replace with your actual server endpoint
const BASE_URL = ''; 

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

