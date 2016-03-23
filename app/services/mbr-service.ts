import {MBRInfo} from "./mbr-info";
import {Injectable} from "angular2/core";

@Injectable()
export class MbrService {
    getMbrInfoWithDelay() {
        let mockMbrInfo: MBRInfo = { "mortId": 11, "otherData": "More data!"};
        return new Promise<MBRInfo>(resolve =>
            setTimeout(() => resolve(mockMbrInfo), 1000)
        );
    }
}