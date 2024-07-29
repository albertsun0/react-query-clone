import { useQuery } from "@tanstack/react-query";

// Mock function that returns data after 1 second
const fetchData = () => {
  console.log("fetching data");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          name: "Post 1",
          description: "Content 1",
        },
        {
          name: "Post 2",
          description: "Content 2",
        },
      ]);
    }, 1000);
  });
};

export const usePostsQuery = () => {
  return useQuery({ queryKey: ["postsData"], queryFn: fetchData });
};

const Posts = ({ title }) => {
  const { status, isFetching, error, data } = usePostsQuery();

  if (status === "pending") return <div>Loading...</div>;
  if (error) return "An error has Occured " + error.message;
  console.log(data);
  return (
    <div style={{ padding: 20 }}>
      <h1>{title}</h1>
      {isFetching && <p>Refetching...</p>}
      {data.map((item) => {
        <div key={item.name}>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
        </div>;
      })}
    </div>
  );
};

function App() {
  return (
    <div>
      <Posts title={"Posts 1"}></Posts>
      <Posts title={"Posts 2"}></Posts>
    </div>
  );
}

export default App;
