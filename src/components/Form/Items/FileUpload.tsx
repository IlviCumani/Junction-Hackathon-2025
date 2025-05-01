import withFormController from "../FormItem";
import { GeneralProps } from "../types/GeneralProps";
import { FormMessage, FormControl, FormDescription, useFormField } from "@/components/ui/form";
import { X } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { nanoid } from "nanoid";
import {
	Dropzone,
	DropzoneDescription,
	DropzoneGroup,
	DropzoneInput,
	DropzoneTitle,
	DropzoneUploadIcon,
	DropzoneZone,
} from "@/components/ui/dropzone";
import {
	FileList,
	FileListDescription,
	FileListHeader,
	FileListIcon,
	FileListInfo,
	FileListItem,
	FileListName,
	FileListSize,
} from "@/components/ui/file-list";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FileUploadProps extends GeneralProps {
	description?: string;
	placeholder?: string;
	required?: boolean;
	field?: {
		value: { id: string; file: File }[] | null;
		onChange: (files: { id: string; file: File }[] | null) => void;
	};
	mode?: "single" | "multiple";
	maxFiles?: number;
	imageOnly?: boolean;
	docksOnly?: boolean;
}

const FileUpload = ({
	name,
	label,
	description,
	required = false,
	field,
	mode = "single",
	maxFiles = 8,
	imageOnly = false,
	docksOnly = false,
	placeholder = "Click here or drag and drop to upload",
}: FileUploadProps) => {
	const { register } = useFormContext();
	const { invalid: error } = useFormField();

	return (
		<>
			<FormControl>
				<Dropzone
					accept={
						imageOnly
							? { "image/*": [".jpg", ".jpeg", ".png", ".gif"] }
							: docksOnly
							? { "application/pdf": [".pdf", ".doc", ".docx"] }
							: {
									"image/*": [".jpg", ".jpeg", ".png", ".gif"],
									"application/pdf": [".pdf", ".doc", ".docx"],
							  }
					}
					onDropAccepted={(addedFiles) => {
						const filesWithId = addedFiles.map((file) => ({
							id: nanoid(),
							file,
						}));

						if (field?.value) {
							field?.onChange([...(field?.value || []), ...filesWithId]);
						} else {
							field?.onChange(filesWithId);
						}
					}}
					multiple={mode === "multiple"}
					maxFiles={maxFiles}
					maxSize={1024 * 1024 * 6}
				>
					<div className="grid gap-4">
						<DropzoneZone className={cn(error && "border-destructive")}>
							<DropzoneInput
								{...register(name, {
									required: required ? "This field is required" : false,
									validate: {
										maxFiles: (files) => {
											if (files.length > maxFiles) {
												return `You can only upload up to ${maxFiles} files`;
											}
											return true;
										},
									},
								})}
							/>
							<DropzoneGroup className="gap-4">
								<DropzoneUploadIcon />
								<DropzoneGroup>
									<DropzoneTitle>{label || "Upload files"}</DropzoneTitle>
									<DropzoneDescription>
										{description || placeholder}
									</DropzoneDescription>
								</DropzoneGroup>
							</DropzoneGroup>
						</DropzoneZone>
					</div>
				</Dropzone>
			</FormControl>
			<FileList>
				{(field?.value || []).map(({ id, file }) => {
					const isImage = file.type.startsWith("image/");
					return (
						<FileListItem key={id}>
							<FileListHeader>
								{isImage ? (
									<img
										src={URL.createObjectURL(file)}
										alt={file.name}
										className="h-12 w-12 rounded object-cover"
									/>
								) : (
									<FileListIcon />
								)}
								<FileListInfo>
									<FileListName
										onClick={() => {
											window.open(URL.createObjectURL(file), "_blank");
										}}
										className="cursor-pointer truncate"
									>
										{file.name}
									</FileListName>
									<FileListDescription>
										<FileListSize>{file.size}</FileListSize>
									</FileListDescription>
								</FileListInfo>
								<Button
									size="icon"
									variant={"outline"}
									type="button"
									className="text-destructive flex items-center justify-center h-8 w-8 rounded-full"
									onClick={() => {
										field?.onChange(
											(field?.value || []).filter((f) => f.id !== id),
										);
									}}
								>
									<X className="size-4" />
								</Button>
							</FileListHeader>
						</FileListItem>
					);
				})}
			</FileList>
			{description && <FormDescription>{description}</FormDescription>}
			<FormMessage />
		</>
	);
};

const Component = withFormController(FileUpload, {
	hideLabel: true,
});

export default Component;
