# Publications — Thomas Carr, Ph.D.

Complete list of peer-reviewed papers, dissertation, and ongoing work. Author: Thomas Carr ([ORCID 0009-0006-6039-0209](https://orcid.org/0009-0006-6039-0209), [Google Scholar](https://scholar.google.com/citations?hl=en&user=a1uc2zEAAAAJ)).

## Dissertation

### Preserving User Privacy on Skeleton-Based Motion Data (2026)

**Thomas Carr.** Ph.D. Dissertation, University of North Carolina at Charlotte, 2026. [ProQuest](https://www.proquest.com/openview/1d6b3a4092c04a3819883a0371080348/1?pq-origsite=gscholar&cbl=18750&diss=y).

This dissertation investigates privacy preservation for skeleton-based motion data in virtual reality and related settings. Although skeleton data appears anonymous, it encodes personally identifiable information through anthropometric structure and motion style, enabling re-identification. The work contributes a family of attack and defense models — including the Linkage Attack Neural Network (LAN), the Privacy-centric Deep Motion Retargeting (PMR) model, explanation-based anonymization, factorized-transformer retargeting (DisentangledTMR), and streaming autoregressive anonymization (MIRAGE) — that together characterize the privacy–utility trade-off and advance the state of the art in privacy-preserving motion analysis.

## Peer-Reviewed Publications

### Privacy-centric Deep Motion Retargeting for Anonymization of Skeleton-Based Motion Visualization (2025)

**Thomas Carr, Depeng Xu, Shuhan Yuan, Aidong Lu.** Proceedings of the IEEE/CVF International Conference on Computer Vision (ICCV), 2025. [Publisher page](https://doi.org/10.1109/ICCV51701.2025.01223) · [arXiv](https://arxiv.org/abs/2405.05428) · [Project page](https://pmr.thomasc.tech).

Capturing and visualizing motion using skeleton-based techniques is a key aspect of computer vision, particularly in virtual reality (VR) settings. Its popularity has surged, driven by the simplicity of obtaining skeleton data and the growing appetite for virtual interaction. Although this skeleton data appears to be non-identifiable, it can be exploited to derive personally identifiable information (PII), posing a risk of inadvertent privacy breaches. In this paper, we explore the application of motion retargeting and its ability to mitigate privacy leakages. Motion retargeting can effectively transfer the motion from an initial user onto a dummy skeleton with the purpose of hiding PII. We propose a Privacy-centric Deep Motion Retargeting model (PMR), which mitigates the PII through adversarial learning. In our evaluation, our proposed model achieves motion retargeting performance on par with the current state-of-the-art models. More importantly, it effectively prevents the attackers from identifying the initial user.

### AnonVis: A Visualization Tool for Human Motion Anonymization (2025)

**Thomas Carr, Ruby Flanagan, Albert Bastakoti, Depeng Xu, Aidong Lu.** IEEE International Symposium on Mixed and Augmented Reality (ISMAR) — Demo Track, 2025. [Publisher page](https://doi.org/10.1109/ISMAR-Adjunct68609.2025.00278).

Privacy preservation in skeleton-based motion data has become increasingly important as virtual and augmented reality applications proliferate. While skeleton data appears abstract, it contains personally identifiable information that can be exploited for privacy attacks. This demonstration presents AnonVis, an interactive VR visualization tool that showcases the Smart Noise anonymization technique. Smart Noise leverages explainable AI to identify privacy-sensitive joints and applies adaptive noises. Our VR demonstration enables comparison between original and anonymized motions, allowing users to understand the privacy-utility trade-offs in motion anonymization. The system integrates a curated dataset processed through a Blender-to-Unity pipeline, providing an immersive environment for exploration.

### Explanation-Based Anonymization Methods for Motion Privacy (2025)

**Thomas Carr, Yaxin Zhao, Depeng Xu, Aidong Lu.** Pacific-Asia Conference on Knowledge Discovery and Data Mining (PAKDD), 2025. [Publisher page](https://doi.org/10.1007/978-981-96-8183-9_5).

We propose novel explanation-based methods for motion privacy preservation in skeleton data. By leveraging explainable AI techniques, we identify and protect sensitive information while maintaining data utility for motion analysis tasks.

### A Review of Privacy and Utility in Skeleton-based Data in Virtual Reality Metaverses (2024)

**Thomas Carr, Depeng Xu, Aidong Lu.** IEEE International Conference on Metaverse Computing, Networking, and Communications (MetaCom), 2024. [Publisher page](https://doi.org/10.1109/MetaCom62920.2024.00041).

Capturing skeleton data is an important area of computer vision, especially for use in a virtual reality (VR) setting. As new simpler pose estimation techniques are created, the popularity of skeleton-based motion data has increased. While the skeleton data appears to be anonymous, it can be exploited to discover personally identifiable information (PII). This poses a risk of unintentional privacy leakages when skeletons are publicly displayed, like in a VR environment. In this survey, we look into the privacy implications posed by the skeleton data, focusing on the privacy and utility trade-off and current privacy-preserving techniques. We also look into differing pose estimation methods that are used to extract the skeleton data from videos or sensors. Then we will look into what skeleton-data is used for, particularly the state-of-the-art action recognition techniques. Lastly, we discuss the ethical implications of the use of skeleton data, emphasizing the need for an interdisciplinary view to address those challenges. This survey aims to provide an understanding of the current landscape of skeleton data while offering insights into the potential privacy issues that this new technique leads to.

### User Privacy in Skeleton-based Motion Data (2024)

**Thomas Carr, Depeng Xu.** IEEE International Conference on Big Data (BigData), 2024. [Publisher page](https://doi.org/10.1109/BigData62323.2024.10825650).

### Linkage Attack on Skeleton-based Motion Visualization (2023)

**Thomas Carr, Aidong Lu, Depeng Xu.** International ACM Conference on Knowledge and Information Management (CIKM), 2023. [Publisher page](https://doi.org/10.1145/3583780.3615263).

Skeleton-based motion capture and visualization is an important computer vision task, especially in the virtual reality (VR) environment. It has grown increasingly popular due to the ease of gathering skeleton data and the high demand of virtual socialization. The captured skeleton data seems anonymous but can still be used to extract personal identifiable information (PII). This can lead to an unintended privacy leakage inside a VR meta-verse. We propose a novel linkage attack on skeleton-based motion visualization. It detects if a target and a reference skeleton are the same individual. The proposed model, called Linkage Attack Neural Network (LAN), is based on the principles of a Siamese Network. It incorporates deep neural networks to embed the relevant PII then uses a classifier to match the reference and target skeletons. We also employ classical and deep motion retargeting (MR) to cast the target skeleton onto a dummy skeleton such that the motion sequence is anonymized for privacy protection. Our evaluation shows that the effectiveness of LAN in the linkage attack and the effectiveness of MR in anonymization.

## Accepted

### DisentangledTMR: Privacy-Preserving Skeleton Motion Retargeting via Factorized Transformers (2026, Accepted)

**Thomas Carr, Shuhan Yuan, Depeng Xu, Aidong Lu.** European Conference on Computer Vision (ECCV), 2026 (Accepted). [Project page](https://tmr.thomasc.tech).

Skeleton-based motion data leak personally identifiable information through both static skeletal structure and dynamic motion patterns, enabling re-identification even without facial features. We present DisentangledTMR, a transformer-based motion retargeting architecture that achieves privacy through explicit architectural disentanglement. Two encoders with complementary inductive biases, temporal convolutions for action and spatial graph convolutions for identity, feed a factorized decoder that fuses their representations through separate cross-attention streams and adaptive gating. A three-stage training curriculum progressively establishes disentanglement, reconstruction, and end-to-end refinement. On three benchmarks, DisentangledTMR substantially reduces re-identification while preserving action recognition, outperforming single-encoder baselines.

## Under Review

### MIRAGE: Motion Identity Removal via Autoregressive Generative Encoding for Privacy-Preserving Skeleton-based Motion Data (2026, Under Review)

**Thomas Carr, Depeng Xu, Aidong Lu.** Conference on Neural Information Processing Systems (NeurIPS), 2026 (Under Review). [Project page](https://mirage.thomasc.tech).

Skeleton motion data leaks identity through anthropometric structure and movement style. Existing anonymization methods based on motion retargeting require a target skeleton at inference, precluding deployment in real-time streaming scenarios. We present MIRAGE, a causal autoregressive Transformer for online skeleton anonymization that operates frame-by-frame using only the current frame and a bounded history window, with no target skeleton required. MIRAGE combines a residual decoder that produces identity-suppressing perturbations while preserving the input coordinate distribution, sliding-window causal attention for constant-memory streaming, and dual-level adversarial-cooperative supervision at both latent and output stages. On NTU RGB+D 60, MIRAGE achieves 89.0% action recognition accuracy with 35.6% re-identification accuracy, competitive with retargeting baselines that require target skeletons, while enabling real-time streaming at 262 FPS with constant memory. Experiments across three benchmarks with external evaluators trained from scratch, component ablations, adaptive attacks, and frozen-evaluator transfer validate the approach.

### AEGIS: Certified User-Level (ε,δ)-Differentially Private Training for Skeleton-Motion Anonymizers (2027, Under Review)

**Thomas Carr, Xujun Che, Depeng Xu, Shuhan Yuan, Aidong Lu.** AAAI Conference on Artificial Intelligence (AAAI), 2027 (Under Review).

Skeleton motion is biometric: static structure and dynamic style jointly identify the subject within seconds, even from three-joint VR streams. Every published skeleton anonymizer to date defends only against the in-loop classifier it was trained on. We introduce AEGIS, the first skeleton-motion anonymizer with a formal user-level (ε,δ)-differential privacy guarantee. AEGIS trains a causal residual-perturbation decoder under user-level DP-SGD; adversarial, contrastive, and information-bottleneck losses are summed into the per-user gradient before clipping and noise, so the certified (ε,δ) bound covers the full composite objective. On NTU RGB+D 120 at ε=8 user-level, AEGIS reaches 77.46% top-1 action recognition on a frozen SGN evaluator — within 1pp of the strongest empirical baseline — while cutting top-1 re-identification from the raw-skeleton ceiling of 98.77% to 37.62%. First demonstration that formal user-level DP for skeleton motion is utility-competitive with the empirical state of the art.

### WRAITH: An Adaptive Evaluation Protocol for Streaming Skeleton De-identification (2027, Under Review)

**Thomas Carr, Xujun Che, Depeng Xu, Shuhan Yuan, Aidong Lu.** AAAI Conference on Artificial Intelligence (AAAI), 2027 (Under Review).

An adaptive evaluation protocol for assessing streaming skeleton de-identification methods under realistic deployment constraints.

## Ongoing Work

### Who You Are Is Not What You Do: Subject Identity Is Encoded but Unused in Skeleton-Based Action Recognition (2027, In Progress)

**Thomas Carr, Xujun Che, Depeng Xu, Shuhan Yuan, Aidong Lu.** IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), 2027 (In Progress).

Work in progress investigating whether skeleton-based action recognition models encode subject identity in their representations even when identity is unused for the action classification objective.
