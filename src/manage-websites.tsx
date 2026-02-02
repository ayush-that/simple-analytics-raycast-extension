import {
  List,
  ActionPanel,
  Action,
  Form,
  useNavigation,
  showToast,
  Toast,
  confirmAlert,
  Alert,
  Color,
  Image,
  openExtensionPreferences,
} from "@raycast/api";
import { useState, useEffect } from "react";
import { Website } from "./lib/types";
import {
  getWebsites,
  addWebsite,
  updateWebsite,
  removeWebsite,
  getActiveWebsiteId,
  setActiveWebsiteId,
  importWebsites,
} from "./lib/storage";
import { testConnection, getDashboardUrl, fetchWebsitesFromAPI, MissingCredentialsError } from "./lib/api";
import { Icons } from "./lib/icons";

function getGlobeIcon(isActive: boolean): Image.ImageLike {
  return {
    source: "globe.svg",
    tintColor: isActive ? Color.Green : Color.SecondaryText,
  };
}

export default function ManageWebsites() {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [activeWebsiteId, setActiveId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { push } = useNavigation();

  async function loadWebsites() {
    setIsLoading(true);
    const sites = await getWebsites();
    const activeId = await getActiveWebsiteId();
    setWebsites(sites);
    setActiveId(activeId);
    setIsLoading(false);
  }

  useEffect(() => {
    loadWebsites();
  }, []);

  async function handleSetActive(website: Website) {
    await setActiveWebsiteId(website.id);
    setActiveId(website.id);
    await showToast({
      style: Toast.Style.Success,
      title: "Active website changed",
      message: website.label || website.domain,
    });
  }

  async function handleDelete(website: Website) {
    const confirmed = await confirmAlert({
      title: "Delete Website",
      message: `Are you sure you want to remove "${website.label || website.domain}"?`,
      primaryAction: {
        title: "Delete",
        style: Alert.ActionStyle.Destructive,
      },
    });

    if (confirmed) {
      await removeWebsite(website.id);
      await loadWebsites();
      await showToast({
        style: Toast.Style.Success,
        title: "Website removed",
      });
    }
  }

  async function handleImportFromAPI() {
    const toast = await showToast({
      style: Toast.Style.Animated,
      title: "Importing websites...",
    });

    try {
      const apiWebsites = await fetchWebsitesFromAPI();
      const domains = apiWebsites.map((w) => w.hostname);
      const { added, skipped } = await importWebsites(domains);

      if (added === 0 && skipped === 0) {
        toast.style = Toast.Style.Success;
        toast.title = "No websites found";
        toast.message = "Your Simple Analytics account has no websites";
      } else if (added === 0) {
        toast.style = Toast.Style.Success;
        toast.title = "All websites already added";
        toast.message = `${skipped} website${skipped !== 1 ? "s" : ""} skipped`;
      } else {
        toast.style = Toast.Style.Success;
        toast.title = `Imported ${added} website${added !== 1 ? "s" : ""}`;
        if (skipped > 0) {
          toast.message = `${skipped} already existed`;
        }
      }

      await loadWebsites();
    } catch (error) {
      if (error instanceof MissingCredentialsError) {
        toast.style = Toast.Style.Failure;
        toast.title = "Credentials required";
        toast.message = "Set API Key and User ID in preferences";
        toast.primaryAction = {
          title: "Open Preferences",
          onAction: () => openExtensionPreferences(),
        };
      } else {
        toast.style = Toast.Style.Failure;
        toast.title = "Import failed";
        toast.message = error instanceof Error ? error.message : "Unknown error";
      }
    }
  }

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Search websites...">
      {websites.length === 0 && !isLoading ? (
        <List.EmptyView
          title="No Websites Configured"
          description="Add your first website to start tracking analytics"
          icon={Icons.globe}
          actions={
            <ActionPanel>
              <Action
                title="Add Website"
                icon={Icons.plus}
                onAction={() => push(<AddWebsiteForm onSuccess={loadWebsites} />)}
              />
              <Action title="Import from Simple Analytics" icon={Icons.download} onAction={handleImportFromAPI} />
            </ActionPanel>
          }
        />
      ) : (
        <List.Section title="Websites" subtitle={`${websites.length} site${websites.length !== 1 ? "s" : ""}`}>
          {websites.map((website) => (
            <List.Item
              key={website.id}
              title={website.label || website.domain}
              subtitle={website.label ? website.domain : undefined}
              icon={getGlobeIcon(website.id === activeWebsiteId)}
              accessories={[website.id === activeWebsiteId ? { tag: { value: "Active", color: Color.Green } } : {}]}
              actions={
                <ActionPanel>
                  <ActionPanel.Section>
                    {website.id !== activeWebsiteId && (
                      <Action title="Set as Active" icon={Icons.check} onAction={() => handleSetActive(website)} />
                    )}
                    <Action.OpenInBrowser title="Open Dashboard" url={getDashboardUrl(website.domain)} />
                  </ActionPanel.Section>
                  <ActionPanel.Section>
                    <Action
                      title="Edit Website"
                      icon={Icons.pencil}
                      shortcut={{ modifiers: ["cmd"], key: "e" }}
                      onAction={() => push(<EditWebsiteForm website={website} onSuccess={loadWebsites} />)}
                    />
                    <Action
                      title="Test Connection"
                      icon={Icons.wifi}
                      shortcut={{ modifiers: ["cmd"], key: "t" }}
                      onAction={async () => {
                        const toast = await showToast({
                          style: Toast.Style.Animated,
                          title: "Testing connection...",
                        });
                        const result = await testConnection(website.domain);
                        if (result.success) {
                          toast.style = Toast.Style.Success;
                          toast.title = "Connection successful";
                        } else {
                          toast.style = Toast.Style.Failure;
                          toast.title = "Connection failed";
                          toast.message = result.error;
                        }
                      }}
                    />
                  </ActionPanel.Section>
                  <ActionPanel.Section>
                    <Action
                      title="Add Website"
                      icon={Icons.plus}
                      shortcut={{ modifiers: ["cmd"], key: "n" }}
                      onAction={() => push(<AddWebsiteForm onSuccess={loadWebsites} />)}
                    />
                    <Action
                      title="Import from Simple Analytics"
                      icon={Icons.download}
                      shortcut={{ modifiers: ["cmd", "shift"], key: "i" }}
                      onAction={handleImportFromAPI}
                    />
                    <Action
                      title="Delete Website"
                      icon={Icons.trash}
                      style={Action.Style.Destructive}
                      shortcut={{ modifiers: ["cmd"], key: "backspace" }}
                      onAction={() => handleDelete(website)}
                    />
                  </ActionPanel.Section>
                </ActionPanel>
              }
            />
          ))}
        </List.Section>
      )}
    </List>
  );
}

interface AddWebsiteFormProps {
  onSuccess: () => void;
}

function AddWebsiteForm({ onSuccess }: AddWebsiteFormProps) {
  const { pop } = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [domainError, setDomainError] = useState<string | undefined>();

  async function handleSubmit(values: { domain: string; label: string }) {
    const domain = values.domain
      .trim()
      .toLowerCase()
      .replace(/^https?:\/\//, "")
      .replace(/\/$/, "");

    if (!domain) {
      setDomainError("Domain is required");
      return;
    }

    setIsLoading(true);

    const toast = await showToast({
      style: Toast.Style.Animated,
      title: "Testing connection...",
    });

    const result = await testConnection(domain);

    if (!result.success) {
      toast.style = Toast.Style.Failure;
      toast.title = "Connection failed";
      toast.message = result.error;
      setIsLoading(false);
      return;
    }

    await addWebsite({
      domain,
      label: values.label || undefined,
    });

    toast.style = Toast.Style.Success;
    toast.title = "Website added";
    toast.message = domain;

    onSuccess();
    pop();
  }

  return (
    <Form
      isLoading={isLoading}
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Add Website" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField
        id="domain"
        title="Domain"
        placeholder="example.com"
        info="The domain of your website tracked by Simple Analytics"
        error={domainError}
        onChange={() => setDomainError(undefined)}
      />
      <Form.TextField
        id="label"
        title="Label"
        placeholder="My Website"
        info="Optional. A friendly name to identify this website"
      />
      <Form.Description text="For private websites, set your API Key in extension preferences." />
    </Form>
  );
}

interface EditWebsiteFormProps {
  website: Website;
  onSuccess: () => void;
}

function EditWebsiteForm({ website, onSuccess }: EditWebsiteFormProps) {
  const { pop } = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [domainError, setDomainError] = useState<string | undefined>();

  async function handleSubmit(values: { domain: string; label: string }) {
    const domain = values.domain
      .trim()
      .toLowerCase()
      .replace(/^https?:\/\//, "")
      .replace(/\/$/, "");

    if (!domain) {
      setDomainError("Domain is required");
      return;
    }

    setIsLoading(true);

    if (domain !== website.domain) {
      const toast = await showToast({
        style: Toast.Style.Animated,
        title: "Testing connection...",
      });

      const result = await testConnection(domain);

      if (!result.success) {
        toast.style = Toast.Style.Failure;
        toast.title = "Connection failed";
        toast.message = result.error;
        setIsLoading(false);
        return;
      }

      toast.hide();
    }

    await updateWebsite(website.id, {
      domain,
      label: values.label || undefined,
    });

    await showToast({
      style: Toast.Style.Success,
      title: "Website updated",
    });

    onSuccess();
    pop();
  }

  return (
    <Form
      isLoading={isLoading}
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Save Changes" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField
        id="domain"
        title="Domain"
        placeholder="example.com"
        defaultValue={website.domain}
        error={domainError}
        onChange={() => setDomainError(undefined)}
      />
      <Form.TextField
        id="label"
        title="Label"
        placeholder="My Website"
        defaultValue={website.label || ""}
        info="Optional. A friendly name to identify this website"
      />
    </Form>
  );
}
