/* eslint-disable react/prop-types */

import { Bar, Pie } from "react-chartjs-2";
import { Chart, registerables, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
Chart.register(...registerables, BarElement, CategoryScale, LinearScale, Tooltip, Legend);
import "../Styles/Graph.css";

export default function Graphs({ users, posts }) {
  const top5Posts = posts.sort((a, b) => b.likes - a.likes).slice(0, 5);
  const postsByCategory = posts.reduce((acc, post) => {
    acc[post.categoria] = (acc[post.categoria] || 0) + 1;
    return acc;
  }, {});
  const top10Users = users.sort((a, b) => b.posts - a.posts).slice(0, 10);

  const top5PostsData = {
    labels: top5Posts.map((post) => `${post.codigo} // ${post.descripcion}}`),
    datasets: [
      {
        data: top5Posts.map((post) => post.likes),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#E7E9ED", "#4BC0C0"],
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.7)",
        hoverBorderColor: "rgba(75,192,192,1)",
      },
    ],
  };
  const postsByCategoryData = {
    labels: Object.keys(postsByCategory),
    datasets: [
      {
        data: Object.values(postsByCategory),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#E7E9ED", "#4BC0C0"],
      },
    ],
  };
  const top10UsersData = {
    labels: top10Users.map((user) => `${user.codigo} // ${user.nombres} ${user.apellidos}`),
    datasets: [
      {
        label: "# de Publicaciones",
        data: top10Users.map((user) => user.posts),
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.7)",
        hoverBorderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return (
    <div className="graph-section">
      <div>
        <div className="chart">
          <h2>Top 5 Post con mas likes</h2>
          <Pie data={top5PostsData} />
        </div>
        <div className="chart">
          <h2>Top 5 Categoria con mayor numero</h2>
          <Pie data={postsByCategoryData} />
        </div>
      </div>
      <div className="chart bar">
        <h2>Top Usuario con mayor posts</h2>
        <Bar data={top10UsersData} />
      </div>
    </div>
  );
}
