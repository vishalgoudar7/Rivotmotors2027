import { loginAction } from "@/app/admin/actions";

export function AdminLogin({ error }: { error?: string }) {
  return (
    <section className="adminLoginPage">
      <div className="adminLoginCard">
        <div className="adminLoginHeader">
          <span>RIVOT</span>
          <h1>Admin Login</h1>
          <p>Order management system</p>
        </div>

        {error ? <div className="adminError">Invalid username or password.</div> : null}

        <form action={loginAction}>
          <label>
            Username
            <input type="text" name="username" required />
          </label>
          <label>
            Password
            <input type="password" name="password" required />
          </label>
          <button type="submit">Login</button>
        </form>

        <div className="adminHint">
          Default login: <b>admin</b> / <b>admin123</b>
        </div>
      </div>

      <style>{`
        .adminLoginPage {
          min-height: 100vh;
          display: grid;
          place-items: center;
          padding: 32px;
          background:
            radial-gradient(circle at 78% 18%, rgba(239, 116, 48, .22), transparent 30%),
            linear-gradient(135deg, #111313 0%, #1b1714 56%, #0b0c0c 100%);
          color: #111;
        }

        .adminLoginCard {
          width: min(100%, 420px);
          padding: 30px;
          border: 1px solid rgba(255, 255, 255, .62);
          border-radius: 18px;
          background: rgba(255, 255, 255, .78);
          box-shadow: 0 28px 76px rgba(0, 0, 0, .28);
          backdrop-filter: blur(24px) saturate(1.35);
          -webkit-backdrop-filter: blur(24px) saturate(1.35);
        }

        .adminLoginHeader {
          margin-bottom: 24px;
          text-align: center;
        }

        .adminLoginHeader span {
          color: #ef7430;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: .22em;
        }

        .adminLoginHeader h1 {
          margin: 10px 0 6px;
          color: #080808;
          font-size: 34px;
          font-weight: 950;
          letter-spacing: -.04em;
        }

        .adminLoginHeader p,
        .adminHint {
          margin: 0;
          color: #68747c;
          font-size: 14px;
          font-weight: 700;
        }

        .adminError {
          margin-bottom: 16px;
          padding: 12px 14px;
          border-radius: 8px;
          background: #ffe1df;
          color: #9f1d16;
          font-size: 14px;
          font-weight: 800;
          text-align: center;
        }

        .adminLoginCard form {
          display: grid;
          gap: 16px;
        }

        .adminLoginCard label {
          display: grid;
          gap: 8px;
          color: #111;
          font-size: 13px;
          font-weight: 900;
        }

        .adminLoginCard input {
          width: 100%;
          height: 48px;
          border: 1px solid rgba(17, 17, 17, .14);
          border-radius: 8px;
          background: rgba(255, 255, 255, .72);
          color: #111;
          padding: 0 14px;
        }

        .adminLoginCard button {
          height: 50px;
          border: 0;
          border-radius: 8px;
          background: #ef7430;
          color: #fff;
          font-weight: 950;
          cursor: pointer;
          box-shadow: 0 16px 34px rgba(239, 116, 48, .28);
        }

        .adminHint {
          margin-top: 20px;
          padding: 14px;
          border-radius: 8px;
          background: rgba(17, 17, 17, .05);
          text-align: center;
        }
      `}</style>
    </section>
  );
}
