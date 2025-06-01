import { useEffect, useState } from "react";

export function useHealthCheck() {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    fetch("http://localhost:8080/health-check")
      .then((res) => res.json())
      .then((data) => {
        setStatus(data === true ? "ok" : "error");
      })
      .catch(() => setStatus("error"));
  }, []); // runs only once

  return status;
}
