import { UseFormSetError, FieldValues, Path } from "react-hook-form";

type SetErrorParams<T> = Path<T> | `root.${string}` | "root";

const clerkHandleErrors = <T extends FieldValues>(
  error: any,
  setError: UseFormSetError<T>,
  paramMapper?: (paramName: string) => SetErrorParams<T>
) => {
  if (error.clerkError) {
    error.errors.forEach((err: any) => {
      const param = err.meta.paramName;
      const errParam: SetErrorParams<T> = paramMapper ? paramMapper(param) : "root.clerkError";

      setError(errParam, {
        type: err.code,
        message: `errors.${err.code}`,
      });
    });
  } else {
    const errParam: SetErrorParams<T> = "root.serverError";
    setError(errParam, {
      type: "server_error",
      message: "errors.server_error",
    });
  }
};

export default clerkHandleErrors;
