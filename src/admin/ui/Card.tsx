import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;

  title?: string;

  actions?: ReactNode;
}

export default function Card({
  children,
  title,
  actions,
}: CardProps) {
  return (
    <section className="card">
      {(title || actions) && (
        <div className="card-header">
          <div className="card-header-left">
            {title && <h2>{title}</h2>}
          </div>

          {actions && (
            <div className="card-header-actions">
              {actions}
            </div>
          )}
        </div>
      )}

      <div className="card-content">
        {children}
      </div>
    </section>
  );
}