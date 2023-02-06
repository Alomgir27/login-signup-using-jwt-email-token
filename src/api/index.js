const baseUrl = "https://sysonex-admin-testing.onrender.com";
const secret = "%&GB@UYED^ygrfv65%Dgf";

async function signup(email, password, confirmpassword) {
  try {
    const response = await fetch(`${baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        confirmpassword,
      }),
    });
    const result = await response.json();
    if (result?.detail) {
      return { error: true, message: result?.detail, status: 400 };
    } else {
      return { success: true, message: `User ${email} created successfully` , status: 200 };
    }
  } catch (err) {
    return { error: true , message: err.message , status : 500};
  }
}

async function login(email, password) {
  try {
    const response = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const result = await response.json();
    if (!result) {
      return { error: result.error, status: 400 };
    } else {
      const { error, success, message } = await verifyToken(result);
      if (error) {
        return { error, message, status: 400 };
      } else {
        return { success, message, status: 200 };
      }
    }
  } catch (err) {
    return { error: true , message: err.message , status : 500};
  }
}

async function verifyToken(token) {
  try {
    const response = await fetch(`${baseUrl}/login/t`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
      }),
    });
    const  result = await response.json();

    //if result is a empty object, then the token is invalid
    if (Object.keys(result).length === 0 || !result) {
      return { error: true, message: "Invalid token", status: 400 };
    } else {
      const { error, success, message } = await authenticate(result);
      if (error) {
        return { error, message, status: 400 };
      } else {
        return { success, message, status: 200 };
      }
    }
  } catch (err) {
    return { error: true , message: err.message , status : 500};
  }
}

async function authenticate(token) {
  try {
    const response = await fetch(`${baseUrl}/auth`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (result === "you are authenticated") {
      localStorage.setItem("token", token);
      return { success: true, message: result };
    } else {
      return { error: true, message: result?.name };
    }
  } catch (err) {
    return { error: err.message };
  }
}


export { signup, login };