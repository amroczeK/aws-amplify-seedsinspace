import "@testing-library/jest-dom/extend-expect";
import { act, render, screen, waitFor, debug } from "@testing-library/react";
import WeatherApp from "../../components/Weather";
import nock from "nock";
import MockDate from "mockdate";
import { QueryClient, QueryClientProvider } from "react-query";

beforeAll(() => {
  MockDate.set("2000-11-22"); // "Wed Nov 22 2000
});

afterAll(() => {
  MockDate.reset();
});

describe("Test Weather", () => {
  test("No Response from API", async () => {
    const mockGeolocation = {
      getCurrentPosition: jest.fn((success, failure, options) => {
        success({
          coords: {
            longitude: 60,
            latitude: 60,
          },
        });
      }),
      stopObserving: jest.fn(),
      watchPosition: jest.fn(),
    };

    global.navigator.geolocation = mockGeolocation;

    const queryClient = new QueryClient();

    const mockOpenWeatherMap = nock("https://api.openweathermap.org")
      .get(/data\/2.5\/.*$/)
      .reply(200, {
        weather: [{ description: "warm", icon: "01d" }],
      });

    await act(() =>
      Promise.resolve(
        render(
          <QueryClientProvider client={queryClient}>
            <WeatherApp />
          </QueryClientProvider>
        )
      )
    );

    mockOpenWeatherMap.isDone();
    const date = screen.getByText("Wednesday 22 November 2000");
    expect(date).toBeInTheDocument();
    // const content = screen.getByText("Weather data currently unavailable");
    // expect(content).not.toBeInTheDocument();
  });
});
