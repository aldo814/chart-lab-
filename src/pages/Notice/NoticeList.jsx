import { useEffect, useState } from "react";
import { client } from "../../api/sanity";

function NoticeList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    client
      .fetch(`*[_type == "notice"] | order(isPinned desc, createdAt desc)`)
      .then(setList);
  }, []);

  return (
    <div>
      <h2>공지사항</h2>

      {list.map(item => (
        <div key={item._id}>
          {item.isPinned && <span>고정</span>}
          <h3>{item.title}</h3>
          <p>{item.createdAt?.slice(0, 10)}</p>
        </div>
      ))}
    </div>
  );
}

export default NoticeList;