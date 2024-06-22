export default function RawFooter() {
  return (
    <div
      className="infoLine"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginRight: "50px",
        }}
      >
        <a href="https://x.com/0xkamal7" target="_blank">
          0xkamal7
        </a>
        <p style={{ margin: 0 }}>{new Date().getFullYear()}</p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <a href="https://t.me/kamalthedev" target="_blank">
          Contact Via Telegram
        </a>
      </div>
    </div>
  );
}
