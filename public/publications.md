# Publications — Thomas Carr, Ph.D.

Complete list of peer-reviewed papers, dissertation, and ongoing work. Author: Thomas Carr ([ORCID 0009-0006-6039-0209](https://orcid.org/0009-0006-6039-0209), [Google Scholar](https://scholar.google.com/citations?hl=en&user=a1uc2zEAAAAJ)).

## Dissertation

### Preserving User Privacy on Skeleton-Based Motion Data (2026)

**Thomas Carr.** Ph.D. Dissertation, University of North Carolina at Charlotte, 2026.

This dissertation investigates privacy preservation for skeleton-based motion data in virtual-reality and related settings. Although skeleton data appears anonymous, it encodes personally identifiable information through anthropometric structure and motion style, enabling re-identification. The work contributes a family of attack and defense models — including the Linkage Attack Neural Network (LAN), the Privacy-centric Deep Motion Retargeting (PMR) model, explanation-based anonymization, factorized-transformer retargeting (DisentangledTMR), and streaming autoregressive anonymization (MIRAGE) — that together characterize the privacy–utility trade-off and advance the state of the art in privacy-preserving motion analysis.

## Peer-Reviewed Publications

### DisentangledTMR: Privacy-Preserving Skeleton Motion Retargeting via Factorized Transformers (2026, Under Review)

**Thomas Carr, Shuhan Yuan, Depeng Xu, Aidong Lu.** ECCV 2026 (Under Review). Project page: [tmr.thomasc.tech](https://tmr.thomasc.tech).

A transformer-based motion-retargeting architecture that achieves privacy through explicit architectural disentanglement. Two encoders with complementary inductive biases — temporal convolutions for action, spatial graph convolutions for identity — feed a factorized decoder that fuses their representations through separate cross-attention streams and adaptive gating. A three-stage training curriculum progressively establishes disentanglement, reconstruction, and end-to-end refinement. On three benchmarks, DisentangledTMR substantially reduces re-identification while preserving action recognition, outperforming single-encoder baselines.

### Privacy-centric Deep Motion Retargeting for Anonymization of Skeleton-Based Motion Visualization (2025)

**Thomas Carr, Depeng Xu, Shuhan Yuan, Aidong Lu.** Proceedings of the IEEE/CVF International Conference on Computer Vision (ICCV) 2025. Project page: [pmr.thomasc.tech](https://pmr.thomasc.tech).

Explores motion retargeting as a mitigation for privacy leakage in skeleton data. Proposes a Privacy-centric Deep Motion Retargeting (PMR) model that uses adversarial learning to suppress personally identifiable information while transferring motion from an initial user onto a dummy skeleton. Achieves retargeting quality on par with state-of-the-art models while preventing attacker re-identification.

### AnonVis: A Visualization Tool for Human Motion Anonymization (2025)

**Thomas Carr, Ruby Flanagan, Albert Bastakoti, Depeng Xu, Aidong Lu.** ISMAR 2025 — Demo Track.

Interactive VR visualization tool showcasing the Smart Noise anonymization technique, which uses explainable AI to identify privacy-sensitive joints and apply adaptive noise. The VR demonstration enables side-by-side comparison between original and anonymized motions, making privacy–utility trade-offs tangible. Built on a curated dataset processed through a Blender-to-Unity pipeline.

### Explanation-Based Anonymization Methods for Motion Privacy (2025)

**Thomas Carr, Yaxin Zhao, Depeng Xu, Aidong Lu.** Pacific-Asia Conference on Knowledge Discovery and Data Mining (PAKDD) 2025.

Novel explanation-based methods for motion privacy preservation in skeleton data. Leverages explainable-AI techniques to identify and protect sensitive information while maintaining data utility for motion-analysis tasks.

### A Review of Privacy and Utility in Skeleton-based Data in Virtual Reality Metaverses (2024)

**Thomas Carr, Depeng Xu, Aidong Lu.** 2024 IEEE International Conference on Metaverse Computing, Networking, and Communications (MetaCom). [IEEE Xplore](https://ieeexplore.ieee.org/abstract/document/10740130).

Survey of privacy implications in skeleton-based motion data, focusing on the privacy–utility trade-off, current privacy-preserving techniques, and pose-estimation methods. Discusses state-of-the-art action-recognition applications and the ethical implications of skeleton-data use.

### User Privacy in Skeleton-based Motion Data (2024)

**Thomas Carr, Depeng Xu.** 2024 IEEE International Conference on Big Data (BigData). [IEEE Xplore](https://ieeexplore.ieee.org/abstract/document/9796423).

Proposes the LAN baseline attack model and the PMR adversarial defense model, and extends the framework with explanation-guided joint masking and a transformer-based retargeting model designed for real-time applications via autoregressive decoding.

### Linkage Attack on Skeleton-based Motion Visualization (2023)

**Thomas Carr, Aidong Lu, Depeng Xu.** CIKM 2023. [ACM Digital Library](https://dl.acm.org/doi/10.1145/3583780.3615263).

Introduces the Linkage Attack Neural Network (LAN) — a Siamese-network-based classifier that detects whether a target and reference skeleton belong to the same individual. Also employs classical and deep motion retargeting to cast target skeletons onto dummies for anonymization.

## Ongoing / In Progress

### MIRAGE: Motion Identity Removal via Autoregressive Generative Encoding for Privacy-Preserving Skeleton-based Motion Data (2027 Target)

**Thomas Carr, Depeng Xu, Aidong Lu.** AAAI 2027 (Target). Project page: [mirage.thomasc.tech](https://mirage.thomasc.tech).

A causal autoregressive Transformer for online skeleton anonymization that operates frame-by-frame using only the current frame and a bounded history window, with no target skeleton required. Combines a residual decoder that produces identity-suppressing perturbations while preserving the input coordinate distribution, sliding-window causal attention for constant-memory streaming, and dual-level adversarial–cooperative supervision at both latent and output stages. On NTU RGB+D 60, MIRAGE achieves 89.0% action recognition accuracy with 35.6% re-identification accuracy, competitive with retargeting baselines that require target skeletons, while enabling real-time streaming at 262 FPS with constant memory.
