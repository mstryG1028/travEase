import { AlertTriangle } from "lucide-react";

import Modal from "./Modal";
import Button from "./Button";

function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "",
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
  danger = true,
}) {
  return (
    <Modal
      open={open}
      onClose={loading ? undefined : onClose}
      showCloseButton={!loading}
    >
      <div
        className="
        bg-surface
        rounded-3xl
        w-[450px]
        max-w-[92vw]
        p-8
        shadow-theme
        "
      >
        <div className="flex justify-center">
          <div
            className={`
              w-16
              h-16
              rounded-full
              flex
              items-center
              justify-center
              ${
                danger ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
              }
            `}
          >
            <AlertTriangle size={30} />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mt-6 text-primary">
          {title}
        </h2>

        {description && (
          <p className="text-secondary text-center mt-3 leading-7">
            {description}
          </p>
        )}

        <div className="flex gap-4 mt-8">
          <Button
            variant="outline"
            fullWidth
            disabled={loading}
            onClick={onClose}
          >
            {cancelText}
          </Button>

          <Button
            fullWidth
            loading={loading}
            onClick={onConfirm}
            variant={danger ? "danger" : "primary"}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmModal;
