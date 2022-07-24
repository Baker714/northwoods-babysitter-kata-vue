import { describe, it, expect, test, beforeEach, afterEach } from "vitest";

import { mount } from "@vue/test-utils";
import Babysitter from "../Babysitter.vue";
import { wrap } from "module";

describe("Babysitter", () => {
  const wrapper = mount(Babysitter);
  const startTimeInput = wrapper.find("#startTime");
  const bedTimeInput = wrapper.find("#bedTime");
  const endTimeInput = wrapper.find("#endTime");

  test("Start time cant be before 5:00 p.m. or after 4:00 a.m.", async () => {
    await startTimeInput.setValue("16:00");
    await bedTimeInput.setValue(":00");
    await endTimeInput.setValue("04:00");
    await wrapper.find("#calcPayBtn").trigger("click");

    expect(wrapper.find("#errorMessage").element.innerHTML).toBe(
      "Start time must be 5:00 p.m. or later.\n"
    );
  });

  test("12 a.m. to 4 a.m.", async () => {
    await startTimeInput.setValue("00:00");
    await bedTimeInput.setValue(":00");
    await endTimeInput.setValue("04:00");
    await wrapper.find("#calcPayBtn").trigger("click");

    expect(wrapper.find("#payField").element.innerHTML).toBe("$ 64.00");
  });

  test("End time cant be after 4:00 a.m. or before 5:00 p.m.", async () => {
    await startTimeInput.setValue("17:00");
    await bedTimeInput.setValue(":00");
    await endTimeInput.setValue("05:00");
    await wrapper.find("#calcPayBtn").trigger("click");

    expect(wrapper.find("#errorMessage").element.innerHTML).toBe(
      "End time must be 4:00 a.m. or earlier.\n"
    );
  });

  test("End time cant be before start time", async () => {
    await startTimeInput.setValue("20:00");
    await bedTimeInput.setValue(":00");
    await endTimeInput.setValue("18:00");
    await wrapper.find("#calcPayBtn").trigger("click");

    expect(wrapper.find("#errorMessage").element.innerHTML).toBe(
      "Start time must be before end time.\n"
    );
  });

  test("Bedtime must fall between start time and end time", async () => {
    await startTimeInput.setValue("20:00");
    await bedTimeInput.setValue("17:00");
    await endTimeInput.setValue("04:00");
    await wrapper.find("#calcPayBtn").trigger("click");

    expect(wrapper.find("#errorMessage").element.innerHTML).toBe(
      "Bed time must be between start time and end time.\n"
    );
  });

  test("5 p.m. to 4 a.m., 8.p.m. bedtime", async () => {
    await startTimeInput.setValue("17:00");
    await bedTimeInput.setValue("20:00");
    await endTimeInput.setValue("04:00");
    await wrapper.find("#calcPayBtn").trigger("click");

    expect(wrapper.find("#payField").element.innerHTML).equals("$ 132.00");
  });

  test("5 p.m. to 4 a.m., no bedtime set", async () => {
    await startTimeInput.setValue("17:00");
    await bedTimeInput.setValue(":00");
    await endTimeInput.setValue("04:00");
    await wrapper.find("#calcPayBtn").trigger("click");

    expect(wrapper.find("#payField").element.innerHTML).equals("$ 148.00");
  });

  test("5 p.m. to 6 p.m.", async () => {
    await startTimeInput.setValue("17:00");
    await bedTimeInput.setValue(":00");
    await endTimeInput.setValue("18:00");
    await wrapper.find("#calcPayBtn").trigger("click");

    expect(wrapper.find("#payField").element.innerHTML).toBe("$ 12.00");
  });

  test("12 a.m. to 2 a.m., 1 a.m. bedtime", async () => {
    await startTimeInput.setValue("00:00");
    await bedTimeInput.setValue("01:00");
    await endTimeInput.setValue("02:00");
    await wrapper.find("#calcPayBtn").trigger("click");

    expect(wrapper.find("#payField").element.innerHTML).equals("$ 32.00");
  });

  test("8 p.m. to 10 p.m., 9 p.m. bedtime", async () => {
    await startTimeInput.setValue("20:00");
    await bedTimeInput.setValue("21:00");
    await endTimeInput.setValue("22:00");
    await wrapper.find("#calcPayBtn").trigger("click");

    expect(wrapper.find("#payField").element.innerHTML).equals("$ 20.00");
  });

  test("8 p.m. to 2 a.m., 12 a.m. bedtime", async () => {
    await startTimeInput.setValue("20:00");
    await bedTimeInput.setValue("00:00");
    await endTimeInput.setValue("02:00");
    await wrapper.find("#calcPayBtn").trigger("click");

    expect(wrapper.find("#payField").element.innerHTML).equals("$ 80.00");
  });

  test("8 p.m. to 12 a.m., 10 a.m. bedtime", async () => {
    await startTimeInput.setValue("20:00");
    await bedTimeInput.setValue("22:00");
    await endTimeInput.setValue("00:00");
    await wrapper.find("#calcPayBtn").trigger("click");

    expect(wrapper.find("#payField").element.innerHTML).equals("$ 40.00");
  });

  test("5 p.m. to 1 a.m., 5 a.m. bedtime", async () => {
    await startTimeInput.setValue("17:00");
    await bedTimeInput.setValue("17:00");
    await endTimeInput.setValue("01:00");
    await wrapper.find("#calcPayBtn").trigger("click");

    expect(wrapper.find("#payField").element.innerHTML).equals("$ 72.00");
  });
});
