import { test, expect } from "@playwright/test";

const baseUrl = "https://reqres.in/api";
const apiKey = "test123";

test(
  "Test GET request using Playwright",
  { tag: "@api" },
  async ({ request }) => {
    const response = await request.get(`${baseUrl}/users?page=1`, {
      headers: { "x-api-key": apiKey },
    });

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(responseBody);

    /**
     * Sample API Response
     * {
            page: 1,
            per_page: 6,
            total: 12,
            total_pages: 2,
            data: [
                {
                id: 1,
                email: 'george.bluth@reqres.in',
                first_name: 'George',
                last_name: 'Bluth',
                avatar: 'https://reqres.in/img/faces/1-image.jpg'
                },
                {
                id: 2,
                email: 'janet.weaver@reqres.in',
                first_name: 'Janet',
                last_name: 'Weaver',
                avatar: 'https://reqres.in/img/faces/2-image.jpg'
                }
            ]  
        }
     */

    expect(responseBody.page).toBe(1);
    expect(responseBody.data.length).toBe(6);
    expect(responseBody.data[0].email).toBe("george.bluth@reqres.in");

    // Verify partial response (best practice)
    expect(responseBody.data[0]).toMatchObject({
      id: 1,
      first_name: "George",
    });

    // Loop through response data
    for (const user of responseBody.data) {
      expect(user.email).toContain("@");
      expect(user.id).toBeGreaterThan(0);
    }

    // Validate schema/type
    expect(typeof responseBody.page).toBe("number");
  },
);

test(
  "Test POST request using Playwright",
  { tag: "@api" },
  async ({ request }) => {
    const payload = {
      name: "Bridge",
      job: "IT",
      id: "25",
      createdAt: "2026-05-09T17:55:49:877Z",
    };

    const response = await request.post(`${baseUrl}/users`, {
      headers: { "x-api-key": apiKey },
      data: payload,
    });

    expect(response.status()).toBe(201);
    console.log(await response.json());
  },
);
