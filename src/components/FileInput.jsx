import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";

const FileInput = (props) => {
  const { name, label = name, mode = "update" } = props;

  const { register, unregister, setValue, watch } = useForm();

  const files = watch(name);

  const onDrop = useCallback(
    (droppedFiles) => {
      let newFiles =
        mode === "update" ? droppedFiles : [...(files || []), ...droppedFiles];
      if (mode === "append") {
        newFiles = newFiles.reduce((prev, file) => {
          const fo = Object.entries(file);
          if (
            prev.find((e) => {
              const eo = Object.entries(e);
              return eo.every(
                ([key, value], index) =>
                  key === fo[index][0] && value === fo[index][1]
              );
            })
          ) {
            return prev;
          } else {
            return [...prev, file];
          }
        }, []);
      }
      setValue(name, newFiles, { shouldValidate: true });
    },
    [setValue, name, mode, files]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: props.accept
  });

  useEffect(() => {
    register(name);
    return () => {
      unregister(name);
    };
  }, [register, unregister, name]);

  return (
    <div style={{ padding: "100px" }}>
      <label
        htmlFor={name} style = {{cursor: 'pointer'}}
      >
        {label}
      </label>

      <div {...getRootProps()}>
        <input
          {...props}
          id={name}
          {...getInputProps()}
        />

        <div>
          <p >Drop the files here ...</p>
          {!!files?.length && (
            <div style={{ display: "inline-flex"}}>
              {files.map((file) => {
                return (
                  <div key={file.name}>
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      style={{ width: "100px", height: "100px",}}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileInput;
