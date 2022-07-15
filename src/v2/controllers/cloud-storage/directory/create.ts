import { Type } from "@sinclair/typebox";
import { FastifyRequestTypebox, Response } from "../../../../types/Server";
import { CloudStorageInfoService } from "../../../services/cloud-storage/info";
import { successJSON } from "../../internal/utils/response-json";

export const cloudStorageDirectoryCreateSchema = {
    body: Type.Object(
        {
            parentDirectoryPath: Type.String({
                maxLength: 298,
                minLength: 1,
                format: "directory-path",
            }),
            directoryName: Type.String({
                maxLength: 50,
                minLength: 1,
            }),
        },
        {
            additionalProperties: false,
        },
    ),
};

export const cloudStorageDirectoryCreate = async (
    req: FastifyRequestTypebox<typeof cloudStorageDirectoryCreateSchema>,
): Promise<Response> => {
    await new CloudStorageInfoService(req.reqID, req.DBTransaction, req.userUUID).createDirectory(
        req.body.parentDirectoryPath,
        req.body.directoryName,
    );

    return successJSON({});
};