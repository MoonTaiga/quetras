
/**
 * Utility function to set up an admin user for testing
 * This would be replaced by proper authentication in a real application
 */
export const setupAdminUser = () => {
  // Get existing users
  const existingUsers = JSON.parse(localStorage.getItem("quetras_users") || "[]");
  
  // Check if admin already exists
  const adminExists = existingUsers.some((user: any) => 
    user.email === "admin@quetras.com" && user.role === "admin"
  );
  
  if (!adminExists) {
    // Add admin user
    const adminUser = {
      id: "admin-" + Date.now().toString(),
      name: "Admin User",
      email: "admin@quetras.com",
      password: "admin123", // In a real app, this would be hashed
      role: "admin"
    };
    
    existingUsers.push(adminUser);
    localStorage.setItem("quetras_users", JSON.stringify(existingUsers));
    console.log("Admin user created with email: admin@quetras.com and password: admin123");
  }
};
