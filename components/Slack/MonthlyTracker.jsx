import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./MonthlyTracker.css";
import {
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { format, getTime } from "date-fns";
import { orderBy } from "lodash";
import UserMessagesDialog from "./UserMessagesDialog";

const MonthlyTracker = () => {
  const [listMessageByMonth, setListMessageOnMonth] = useState([]);
  const [listUserNameInfo, setListUserNameInfo] = useState([]);
  const [topKeywordsTotal, setTopKeywordsTotal] = useState([]);
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(
    currentDate.getFullYear() + "-" + currentDate.getMonth()
  );
  const [last6Months, setLast6Months] = useState([]);
  const weekTimestamp = getWeekTimestamp(selectedMonth);

  const totalMessage = useMemo(() => {
    let total = 0;
    listMessageByMonth.forEach((info) => {
      total += info.length;
    });
    return total;
  }, [listMessageByMonth]);

  const rows = useMemo(() => {
    let keywordsList = [];
    const list = listMessageByMonth.map((messages, index) => {
      const userNames = [];
      const listWord = [];
      messages.forEach((message) => {
        if (message.text) {
          listWord.push(...message.text.split(" "));
        }
        const useInfo = listUserNameInfo.find(({ id }) => id === message.user);
        if (useInfo && !userNames.includes(useInfo.real_name)) {
          userNames.push(useInfo.real_name);
        }
      });
      let sortKey = handleSortTopKeywords(listWord);
      sortKey = sortKey.filter(
        ({ key }) =>
          !["a", "A", "i", "I", "the", "We", "will", "have", "those", "send", "me", "Send", "of", "from"].includes(key)
      );
      keywordsList.push(...sortKey);
      sortKey = sortKey.slice(0, 3);
      sortKey = sortKey.map(({ key }) => key);
      return createData(
        `Week ${index + 1}`,
        messages.length,
        userNames.join(", "),
        sortKey.join(", ")
      );
    });
    keywordsList = orderBy(keywordsList, ["repeat"], ["desc"]);
    keywordsList = keywordsList.slice(0, 3);
    keywordsList = keywordsList.map(({ key }) => key);
    setTopKeywordsTotal(keywordsList);
    return list;
  }, [listMessageByMonth, listUserNameInfo]);

  const handleGetAllChannelMessageInMonth = useCallback(async () => {
    let promises = [];

    weekTimestamp.forEach((week, index) => {
      if (index < weekTimestamp.length - 1) {
        promises.push(
          handleGetChannelMessage(week / 1000, weekTimestamp[index + 1] / 1000)
        );
      }
    });

    const lisMessage = await Promise.all(promises);
    setListMessageOnMonth(lisMessage);
  }, [weekTimestamp]);

  const getUserNameInfo = async (listUserId) => {
    const promises = listUserId.map((id) => {
      return handleGetUserNameInfo(id);
    });
    const list = await Promise.all(promises);
    setListUserNameInfo(list || []);
  };

  useEffect(() => {
    const listUserId = [];

    listMessageByMonth.forEach((info) => {
      info.forEach(({ user: userId }) => {
        if (userId && !listUserId.includes(userId)) {
          listUserId.push(userId);
        }
      });
    });

    getUserNameInfo(listUserId);
  }, [listMessageByMonth]);

  useEffect(() => {
    handleGetAllChannelMessageInMonth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMonth]);

  useEffect(() => {
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const m = [];
    for (let i = 0; i < 6; i++) {
      m.push(new Date(currentYear, currentMonth - i, 1));
    }
    setLast6Months(m);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box minWidth="100%">
      <h1>Monthly Tracker</h1>
      <Typography sx={{ marginBottom: 4, fontWeight: "bold" }}>
        Channel Name: Test-Project 2
      </Typography>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCellFullBorder colSpan={3}>
                <Typography sx={{ fontWeight: "bold", fontSize: 18 }}>
                </Typography>
                <FormControl fullWidth>
                  <Select
                    labelId="month-select-label"
                    id="month-select"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                  >
                    {last6Months.map((d) => (
                      <MenuItem value={d.getFullYear() + "-" + d.getMonth()}>
                        {format(d, "MMMM yyyy")}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCellFullBorder>

              <TableCellFullBorder></TableCellFullBorder>
            </TableRow>
            <TableRow>
              <TableCellFullBorder width={"20%"}>
                <Typography sx={{ fontWeight: "bold" }}>Weeks</Typography>
              </TableCellFullBorder>
              <TableCellFullBorder width={"20%"}>
                <Typography sx={{ fontWeight: "bold" }}>Message</Typography>
              </TableCellFullBorder>

              <TableCellFullBorder width={"40%"}>
                <Typography sx={{ fontWeight: "bold" }}>Users</Typography>
              </TableCellFullBorder>

              <TableCellFullBorder width={"20%"}>
                <Typography sx={{ fontWeight: "bold" }}>
                  Top Keywords
                </Typography>
              </TableCellFullBorder>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  style={{
                    borderLeft: "1px solid #000",
                    borderRight: "1px solid #000",
                  }}
                  align="center"
                >
                  {row.weeks}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    borderLeft: "1px solid #000",
                    borderRight: "1px solid #000",
                  }}
                >
                  {row.messages}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    borderLeft: "1px solid #000",
                    borderRight: "1px solid #000",
                  }}
                >
                  <Stack direction="row" sx={{ justifyContent: "center" }}>
                    <Typography
                      sx={{
                        maxWidth: 500,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row.users}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    borderLeft: "1px solid #000",
                    borderRight: "1px solid #000",
                  }}
                >
                  <Stack direction="row" sx={{ justifyContent: "center" }}>
                    <Typography
                      sx={{
                        maxWidth: 250,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row.keywords}
                    </Typography>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCellFullBorder width={"20%"}>
                <Typography sx={{ fontWeight: "600" }}>Total</Typography>
              </TableCellFullBorder>

              <TableCellFullBorder width={"20%"}>
                <Typography sx={{ fontWeight: "600" }}>
                  {totalMessage}
                </Typography>
              </TableCellFullBorder>

              <TableCellFullBorder width={"40%"}>
                {Array.isArray(listUserNameInfo)
                  ? listUserNameInfo.map(({ real_name, id }) => (
                      <UserMessagesDialog
                        username={real_name}
                        userId={id}
                        messages={listMessageByMonth}
                      />
                    ))
                  : ""}
              </TableCellFullBorder>

              <TableCellFullBorder width={"20%"}>
                <Stack direction="row" sx={{ justifyContent: "center" }}>
                  <Typography
                    sx={{
                      maxWidth: 250,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {topKeywordsTotal.join(", ")}
                  </Typography>
                </Stack>
              </TableCellFullBorder>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

const TableCellFullBorder = ({ children, ...otherProps }) => {
  return (
    <TableCell
      style={{ border: "1px solid #000" }}
      align="center"
      {...otherProps}
    >
      {children}
    </TableCell>
  );
};

TableCellFullBorder.display = "TableCellFullBorder";

export default MonthlyTracker;

function createData(weeks, messages, users, keywords) {
  return { weeks, messages, users, keywords };
}

const getWeekTimestamp = (selectedDate) => {
  // const month = getMonth(currentDate);
  // const year = getYear(currentDate);
  const [year, month] = selectedDate.split("-");
  const firstDatTimeStamp = getTime(new Date(year, month, 1));
  const lastDayTimeStamp = getTime(new Date(year, month + 1, 1));
  return [
    firstDatTimeStamp,
    firstDatTimeStamp + 604800000,
    firstDatTimeStamp + 604800000 * 2,
    firstDatTimeStamp + 604800000 * 3,
    lastDayTimeStamp,
  ];
};

const handleGetChannelMessage = async (oldest, latest) => {
  console.log(oldest, latest);
  try {
    const axiosOptions = {
      method: "GET",
      url: `https://slack.com/api/conversations.history?channel=C0467LR8T6H&oldest=${oldest}&latest=${latest}`,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
      withCredentials: false,
    };

    const response = await axios(axiosOptions);

    if (response.status === 200) {
      const { messages } = response.data;
      if (messages !== undefined) {
        return messages;
      } else {
        return [];
      }
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

const handleGetUserNameInfo = async (userId) => {
  try {
    const axiosOptions = {
      method: "GET",
      url: `https://slack.com/api/users.info?user=${userId}&pretty=1`,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
      withCredentials: false,
    };

    const response = await axios(axiosOptions);

    if (response.status === 200) {
      const { user } = response.data;
      if (user !== undefined) {
        return { id: user.id, real_name: user.real_name };
      } else {
        return {};
      }
    } else {
      return {};
    }
  } catch (error) {
    console.error(error);
    return {};
  }
};

const handleSortTopKeywords = (listKeys) => {
  const keyRepeat = [];

  let findDuplicates = (key) => listKeys.filter((item) => item === key);

  listKeys.forEach((key) => {
    if (!keyRepeat.find(({ key: keyItem }) => keyItem === key)) {
      keyRepeat.push({ key, repeat: findDuplicates(key)?.length || 1 });
    }
  });
  const sortTopKeywords = orderBy(keyRepeat, ["repeat"], ["desc"]);
  return sortTopKeywords;
};
