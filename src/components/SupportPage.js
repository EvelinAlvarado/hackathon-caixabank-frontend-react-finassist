import React, {
  useState,
  useEffect,
  Profiler,
  Suspense,
  useContext,
} from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Button,
} from "@mui/material";
import { onRenderCallback } from "../utils/onRenderCallback";
import { ContactsContext } from "../context/ContactsContext";

function SupportPage() {
  //const [users, setUsers] = useState([]);
  const { contactsList } = useContext(ContactsContext);
  const [loading, setLoading] = useState(false); //initial=true
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Implement the effect to get user data from the API
  // Instructions:
  // - Use the `useEffect` hook to make the request to the `https://jsonplaceholder.typicode.com/users` URL.
  // - If the response is successful, save the data in the `users` state and change `loading` to false.
  // - If there is an error, it saves the error message in `error` state and changes `loading` to false.
  console.log(contactsList);

  useEffect(() => {
    // Request implementation and error handling

    if (contactsList.length > 0) {
      setLoading(false);
    } else {
      setError("No contacts found.");
      setLoading(false);
    }
  }, [contactsList]);

  const handleSearchChange = (event) => {
    // Update search term
    setSearchTerm(event.target.value);
  };

  // Filter users by search term
  // Instructions:
  // - Implement logic to filter users by `searchTerm`.
  // - Use the `filter` method to check if the `user.name` contains the `searchTerm`.
  const filteredContacts = contactsList.filter(
    (
      contact // Switch to the correct filtering logic
    ) => contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Display loading spinner
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    // Display error message
  }

  return (
    <Profiler id="SupportPage" onRender={onRenderCallback}>
      <Box
        sx={{
          mt: 4,
          p: { xs: 0, sm: 2, md: 4 },
          bgcolor: "background.default",
        }}
      >
        <Typography variant="h4" gutterBottom color="primary">
          Support Contacts
        </Typography>

        {/* Implement the search bar */}
        {/* Instructions:
                    - Uses the `TextField` component of Material UI.
                    - The `label` must be ‘Search by Name’ and must be a fullWidth text field.
                    - The value of the field must be linked to `searchTerm` and must be updated when the user types into the field.
                */}

        {/* Here is the search bar */}
        <TextField
          label="Search by Name"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ mb: 4 }}
        />

        {/* Implement the support contact list */}
        {/* Instructions:
                    - Use the `List` component of Material UI to display contacts.
                    - Within each `ListItem`, use `ListItemAvatar` to display an avatar with the `Avatar` component.
                    - For text, use `ListItemText` with `primary` as the name and email, and `secondary` for the phone and company.
                    - Add a contact button with the `Button` component of Material UI, which uses the `href` property to open the email with `mailto:${user.email}`.
                    - Don't forget to add `sx` to style the list.
                */}
        {/* Here are the filtered users */}
        {/* Instructions for each `ListItem`:
                                - Display name and email as primary text.
                                - Show phone and company as secondary text.
                                - Use `Avatar` in `ListItemAvatar` to display the avatar.
                                - Add the contact button with the e-mail address.
                            */}
        <Suspense fallback={<CircularProgress />}>
          <Paper sx={{ p: { xs: 0, sm: 3 }, borderRadius: 2, boxShadow: 3 }}>
            <List>
              {filteredContacts.map((contact) => {
                const avatarUrl = `https://i.pravatar.cc/150?img=${contact.id}`;
                return (
                  <ListItem key={contact.id} sx={{ marginBottom: "16px" }}>
                    <ListItemAvatar>
                      <Avatar alt={contact.name} src={avatarUrl} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${contact.name} - ${contact.email}`}
                      secondary={`Phone: ${contact.phone} | Company: ${contact.company.name}`}
                    />
                    <Button
                      href={`mailto:${contact.email}`}
                      variant="contained"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Contact
                    </Button>
                  </ListItem>
                );
              })}
            </List>
          </Paper>
        </Suspense>
      </Box>
    </Profiler>
  );
}

export default SupportPage;
