import { Injectable } from "@nestjs/common";
import { Identity } from "./identity.interface";

@Injectable()
export class IdentityService {
  async process(identity: Identity) {
    return fetch(`https://api.okra.ng/v2/mock-api/process-bvn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bvn: identity.bvn }),
    }).then((res) => res.json());
  }

  async accounts(identity: Identity) {
    return fetch('https://api.okra.ng/v2/mock-api/accounts-by-bvn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bvn: identity.bvn }),
    }).then((res) => res.json());
  }

  async confirm(identity: Identity) {
    let url: RequestInfo;
    if (identity.nuban) {
      url = `https://api.okra.ng/v2/mock-api/confirm-nuban`;
    } else if (identity.bvn) {
      url = `https://api.okra.ng/v2/mock-api/confirm-bvn`;
    }

    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(identity),
    }).then((res) => res.json());
  }
}
