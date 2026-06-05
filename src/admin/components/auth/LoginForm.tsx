import { useState } from "react";

import Card from "../../ui/Card";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

import { login }
  from "../../services/authService";

interface LoginFormProps {
  onSuccess: () => void;
}

export default function LoginForm({
  onSuccess,
}: LoginFormProps) {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      setError("");

      await login(email, password);

      onSuccess();
    } catch (err) {
      setError(
        "Neplatné přihlašovací údaje"
      );

      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <Card title="Administrace">
        <form
          className="login-form"
          onSubmit={handleSubmit}
        >
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <Input
            label="Heslo"
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          {error && (
            <p className="form-error">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Přihlašuji..."
              : "Přihlásit"}
          </Button>
        </form>
      </Card>
    </div>
  );
}