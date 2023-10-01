type AuthCredType = {
   clientId: string;
   clientSecret: string;
};

type CreateFolderUIProps = {
   isOpen: boolean;
   onClose: () => void;
};

type FileUploads = {
   fileName: String;
   progress: number;
   isVisible: boolean;
   onClose: () => void;
};
