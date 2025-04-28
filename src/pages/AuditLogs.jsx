import React, { useEffect, useState } from "react";
import "../styles/Common.css";
import Menu from "../components/Menu";
import { getAuditLogsAPI} from "../services/allAPI";

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);

  const getLogs = async () => {
    const token = sessionStorage.getItem("token");
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (token && user.role == "admin") {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const result = await getAuditLogsAPI(reqHeader);
        if (result.status == 200) {
          setLogs(result.data);
        } else {
          alert(result.response.data);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("admin access only");
    }
  };

  useEffect(() => {
    getLogs();
  }, []);

  return (
    <>
      <Menu />
      <div className="maindiv">
        <h4 className="my-3">Audit Logs :</h4>
        <div className="table-responsive">
          <table className="table table-bordered ">
            <thead>
              <tr>
                <th>User</th>
                <th>Action</th>
                <th>Target</th>
                <th>Before</th>
                <th>After</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
            {logs.map((log) => (
            <tr key={log._id}>
                    <td>{log.user?.username}-{log.user?.role }</td>
              <td>{log.action}</td>
              <td>{log.target}</td>
              <td>
                <pre>{JSON.stringify(log.changes?.before, null, 2)}</pre>
              </td>
              <td>
                <pre>{JSON.stringify(log.changes?.after, null, 2)}</pre>
              </td>
              <td>{new Date(log.createdAt).toLocaleString()}</td>
            </tr>
          ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AuditLogs;
