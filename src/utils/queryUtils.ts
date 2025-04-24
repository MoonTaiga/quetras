
export const hasSubmittedQueryToday = (userId: string): boolean => {
  const storedQueries = localStorage.getItem("quetras_queries");
  if (!storedQueries) return false;

  try {
    const queries = JSON.parse(storedQueries);
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    
    return queries.some((query: any) => 
      query.studentId === userId && 
      query.date.split('T')[0] === today
    );
  } catch (error) {
    console.error("Error checking query submission:", error);
    return false;
  }
};

