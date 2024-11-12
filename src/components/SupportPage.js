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
  const { contactsList } = useContext(ContactsContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
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

  const filteredContacts = contactsList.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

        <TextField
          label="Search by Name"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ mb: 4 }}
        />

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
