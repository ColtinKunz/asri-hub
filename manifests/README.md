# Manifest Templates

This repo contains starter manifests for projects that encompass the vast majority of what might be required when setting up a new project. The intent is for `base` and `overlays` to remain relatively small, while components expands to allow for highly modular deployments.

# Initial Steps

When setting up a new repo from these templates, begin by populating the `.sops.yaml`, then encrypting the pullcred and the `.env` files found in the `components` directory. Next, go into the overlays and build them to inspect the resulting output and search for components that should be added and removed to achieve your desired state.

> Note: there are several init_containers defined in the components that maybe be useful across projects.
